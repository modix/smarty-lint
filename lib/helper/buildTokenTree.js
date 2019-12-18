/**
 * @typedef {import('../rule').TokenTreeBranch} TokenTreeBranch
 * @typedef {import('../linter').Token} Token
 */

/**
 * Convert the flat scope structure into a tree structure.
 *
 * @param {Token[]} tokens
 * @returns {TokenTreeBranch | undefined | never}
 */
module.exports = function buildTokenTree (tokens) {
	/** @type {{ children: TokenTreeBranch[] }} */
	const tree = { children: [] };

	for (const token of tokens) {
		let branch = /** @type {TokenTreeBranch} */(tree);

		for (let i = 0; i < token.scopes.length; i++) {
			const scope = token.scopes[i];
			const tmScope = token.tmScopes[i];
			const isChildBegin = (i + 1 < token.scopes.length ? token.scopes[i + 1] === 'begin' : false);

			if (
				branch.children.length === 0 ||
				isChildBegin ||
				branch.children[branch.children.length - 1].tmName !== tmScope
			) {
				branch.children.push({
					name: scope,
					tmName: tmScope,
					children: [],
					startLine: token.startLine,
					startColumn: token.startColumn,

					// They are set below
					endLine: 0,
					endColumn: 0,
					raw: ''
				});
			}

			branch = branch.children[branch.children.length - 1];

			branch.endLine = token.endLine;
			branch.endColumn = token.endColumn;
		}
	}

	if (tree.children.length === 1) {
		return tree.children[0];
	}
	else if (tree.children.length > 1) {
		throw new Error('The Smarty document has multiple root items. This cannot be parsed.');
	}

	return undefined;
};
