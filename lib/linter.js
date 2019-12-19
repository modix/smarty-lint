const buildTokenTree = require('./helper/buildTokenTree');
const checkInvalid = require('./helper/checkInvalid');
const fillRaw = require('./helper/fillRaw');
const getLineOffsets = require('./helper/getLineOffsets');
const initRules = require('./helper/initRules');
const readFile = require('./helper/readFile');
const shrinkTokens = require('./helper/shrinkTokens');
const tokenizeDocument = require('./helper/tokenizeDocument');

/**
 * @typedef {import('./linter').Failure} Failure
 * @typedef {import('./linter').FailureSeverity} FailureSeverity
 * @typedef {import('./linter').OptionsRules} OptionsRules
 * @typedef {import('./linter').Token} Token
 * @typedef {import('./linter').LinterRule} LinterRule
 * @typedef {import('./rule').RuleFunction} RuleFunction
 * @typedef {import('./rule').AddErrorFunction} AddErrorFunction
 * @typedef {import('./rule').TokenTreeBranch} TokenTreeBranch
 */

const SMARTY_SCOPE_NAME = 'source.smarty';

/** @type {LinterRule[]} */
const linterRules = [];

/** @type {import('vscode-textmate')} */
let vsctm;

/** @type {import('vscode-textmate').IGrammar | null} */
let grammar = null;

module.exports = {
	/**
	 * @param {object} [options]
	 * @param {import('vscode-textmate') | null} [options.vscodeTextMate]
	 * @param {OptionsRules} [options.rules]
	 * @returns {Promise<void> | never}
	 */
	async initialize (options = {}) {
		if (options && options.vscodeTextMate) {
			vsctm = options.vscodeTextMate;
		}
		else {
			// eslint-disable-next-line global-require
			vsctm = require('vscode-textmate');
		}

		linterRules.push(...initRules(options.rules));

		const registry = new vsctm.Registry({
			/**
			 * @param {string} scopeName
			 * @returns {Promise<import('vscode-textmate').IRawGrammar | undefined | null>}
			 */
			async loadGrammar (scopeName) {
				if (scopeName === SMARTY_SCOPE_NAME) {
					// eslint-disable-next-line global-require
					const grammarFile = require('@modix/smarty-tmlanguage');
					const content = await readFile(grammarFile);

					return vsctm.parseRawGrammar(content.toString(), grammarFile);
				}

				return null;
			}
		});

		grammar = await registry.loadGrammar(SMARTY_SCOPE_NAME);

		if (grammar === null) {
			throw new Error('Unable to load Smarty grammar.');
		}
	},

	/**
	 * @param {string} sourceCode
	 * @param {object} [options]
	 * @param {string} [options.fileName]
	 * @param {number} [options.maxFailures]
	 * @returns {Promise<Failure[]> | never}
	 */
	// eslint-disable-next-line require-await
	async verify (sourceCode, options) {
		if (!vsctm || !grammar) {
			throw new Error('Linter is not initialized');
		}

		const lines = sourceCode.split('\n');
		const tokens = shrinkTokens(tokenizeDocument(lines, vsctm, grammar));

		// If only one item exist, it's "root" ("smarty.source") - which means, no smarty tags available.
		if (tokens.length <= 1) {
			return [];
		}

		const spacesOnlyRE = /^\s*$/u;

		const lineOffsets = getLineOffsets(lines);

		/** @type {Failure[]} */
		const failures = checkInvalid(sourceCode, tokens, lineOffsets);

		// Don't build the tree, if there is invalid code
		if (failures.length > 0) {
			return failures;
		}

		/** @type {TokenTreeBranch | undefined} */
		const tree = fillRaw(buildTokenTree(tokens.filter((token) => !(
			token.scopes.length === 1 ||

			// Only the "begin" scope may have only spaces (e.g. to indicate the begin of a new unnamed attribute), other tokens must have non-space-content.
			(token.scopes[token.scopes.length - 1] !== 'begin' && spacesOnlyRE.test(sourceCode.substring(lineOffsets[token.startLine] + token.startColumn, lineOffsets[token.endLine] + token.endColumn)))
		))), sourceCode, lineOffsets);

		if (tree !== undefined) {
			for (const rule of linterRules) {
				if (options && options.maxFailures && failures.length > options.maxFailures) {
					break;
				}

				rule.exec({
					...rule.options,

					tree,

					/** @type {AddErrorFunction} */
					addError (failure) {
						failures.push({
							ruleId: rule.name,
							severity: rule.severity,
							...failure
						});
					}
				});
			}
		}

		return failures;
	}
};
