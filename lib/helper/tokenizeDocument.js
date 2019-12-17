const mapScopes = require('./mapScopes');

/** @typedef {import('../linter').Token} Token */

/**
 * Tokenize a given text document
 *
 * @param {string[]} lines
 * @param {import('vscode-textmate')} vsctm
 * @param {import('vscode-textmate').IGrammar} grammar
 * @returns {Token[]}
 */
module.exports = function tokenizeDocument (lines, vsctm, grammar) {
	/** @type {Token[]} */
	const tokens = [];

	let ruleStack = vsctm.INITIAL;

	for (let line = 0; line < lines.length; line++) {
		const lineTokens = grammar.tokenizeLine(lines[line], ruleStack);

		ruleStack = lineTokens.ruleStack;

		tokens.push(
			/**
			 * @param {{ scopes: string[]; startIndex: any; endIndex: any; }} token
			 */
			...lineTokens.tokens
				.map((token) => ({
					scopes: mapScopes(token.scopes.join('>')).split('>'),
					tmScopes: token.scopes,
					startLine: line,
					startColumn: token.startIndex,
					endLine: line,
					endColumn: token.endIndex
				}))
		);
	}

	return tokens;
}
