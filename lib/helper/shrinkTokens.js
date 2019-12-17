/** @typedef {import('../linter').Token} Token */

/**
 * Merge consecutively tokens and also replaces the tmLanguage-scope names by names, which will be used for further processing, by utilizing mapScopes()
 *
 * @param {Token[]} tokens
 * @returns {Token[]}
 */
module.exports = function shrinkTokens (tokens) {
	if (tokens.length === 0) {
		return tokens;
	}

	const mergedTokens = [tokens[0]];

	/** @type {string} */
	let prevTmScopes = mergedTokens[0].tmScopes.join('>');

	/** @type {Token} */
	let prevToken = mergedTokens[0];

	for (let i = 1; i < tokens.length; i++) {
		const token = tokens[i];
		const tmScopes = token.tmScopes.join('>');

		if (tmScopes === prevTmScopes) {
			prevToken.endLine = token.endLine;
			prevToken.endColumn = token.endColumn;
		}
		else {
			mergedTokens.push(token);

			prevTmScopes = tmScopes;
			prevToken = token;
		}
	}

	/*
	 * Unnamed Attributes are hard to handle by tmLanguage. While {mdx_vardump 1 2} has 2 unnamed attributes, {mdx_vardump 1 + 2} has one attribute.
	 * So we fix that here, by simply removing the "begin" of the second attribute, if it starts with an "operation" or "operationIs"
	 */
	for (let i = mergedTokens.length - 1; i > 0 ; i--) {
		const unnamedAttributeIndex = mergedTokens[i].scopes.indexOf('unnamedAttribute');

		if (
			unnamedAttributeIndex !== -1 &&
			(mergedTokens[i].scopes[unnamedAttributeIndex + 1] === 'operation' || mergedTokens[i].scopes[unnamedAttributeIndex + 1] === 'operationIs') &&
			mergedTokens[i - 1].scopes[unnamedAttributeIndex + 1] === 'begin' &&
			(mergedTokens[i - 2].scopes[unnamedAttributeIndex] === 'unnamedAttribute' || mergedTokens[i - 2].scopes[unnamedAttributeIndex] === 'namedAttribute')
		) {
			mergedTokens.splice(i - 1, 1);
		}
	}

	return mergedTokens;
}
