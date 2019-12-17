/**
 * @typedef {import('../linter').Failure} Failure
 * @typedef {import('../linter').Token} Token
 */

const ILLEGAL_SCOPE_MAPPING = {
	'invalid.illegal.array.literal.smarty': 'array literal',
	'invalid.illegal.assignment.smarty': 'assignment',
	'invalid.illegal.block.smarty': 'Smarty block function',
	'invalid.illegal.block-for.smarty': 'block "{for}"',
	'invalid.illegal.block-foreach.smarty': 'block "{foreach}"',
	'invalid.illegal.block-literal.smarty': 'block "{literal}"',
	'invalid.illegal.expression.smarty': 'basic expression',
	'invalid.illegal.expression-aauonms.smarty': 'extended AAUONMS expression',
	'invalid.illegal.expression-acuonms.smarty': 'extended ACUONMS expression',
	'invalid.illegal.expression-auonms.smarty': 'extended AUONMS expression',
	'invalid.illegal.function.smarty': 'function',
	'invalid.illegal.function-modifier.smarty': 'function with modifier',
	'invalid.illegal.named-attribute.smarty': 'named attribute',
	'invalid.illegal.smarty': 'Smarty block',
	'invalid.illegal.sub-block-else.smarty': 'sub-block "{else}"',
	'invalid.illegal.sub-block-elseif.smarty': 'sub-block "{elseif}"',
	'invalid.illegal.sub-block-foreachelse.smarty': 'sub-block "{foreachelse}"',
	'invalid.illegal.sub-block-forelse.smarty': 'sub-block "{forelse}"',
	'invalid.illegal.sub-block-sectionelse.smarty': 'sub-block "{selectionelse}"',
	'invalid.illegal.unnamed-attribute.smarty': 'unnamed attribute',
	'invalid.illegal.wrapped-variable-expression.smarty': 'wrapped variable'
};

const invalidTmScopeRE =  /^invalid(\.|$)/u;
const spacesOnlyRE = /^\s*$/u;

/**
 * Search invalid tokens in the tree and generate failures.
 *
 * @param {string} sourceCode
 * @param {Token[]} tokens
 * @param {number[]} lineOffsets
 */
module.exports = function checkInvalid (sourceCode, tokens, lineOffsets) {
	/** @type {Failure[]} */
	const failures = [];

	for (const token of tokens) {
		if (token.scopes.some((scope) => scope === 'invalid')) {
			if (spacesOnlyRE.test(sourceCode.substring(lineOffsets[token.startLine] + token.startColumn, lineOffsets[token.endLine] + token.endColumn))) {
				failures.push({
					ruleId: 'internalUnnecessaryTrailingSpace',
					message: `Unnecessary trailing space`,
					startLine: token.startLine,
					startColumn: token.startColumn,
					endLine: token.endLine,
					endColumn: token.endColumn,
					severity: 'warn'
				});
			}
			else {
				const tmScope = token.tmScopes.find((scope) => invalidTmScopeRE.test(scope))

				failures.push({
					ruleId: 'internalInvalid',
					message: `Invalid expression "${sourceCode.substring(lineOffsets[token.startLine] + token.startColumn, lineOffsets[token.endLine] + token.endColumn)}"${(tmScope && tmScope in ILLEGAL_SCOPE_MAPPING ? ` in ${ILLEGAL_SCOPE_MAPPING[tmScope]}` : '')}.`,
					startLine: token.startLine,
					startColumn: token.startColumn,
					endLine: token.endLine,
					endColumn: token.endColumn,
					severity: 'error'
				});
			}
		}
	}

	return failures;
}
