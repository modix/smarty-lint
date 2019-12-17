/** @typedef {import('../rule').TokenTreeBranch} TokenTreeBranch */

/**
 * Convert the flat scope structure into a tree structure.
 *
 * @param {TokenTreeBranch | undefined} tree
 * @param {string} text
 * @param {number[]} lineOffsets
 * @returns {TokenTreeBranch | undefined}
 */
module.exports = function fillRaw (tree, text, lineOffsets) {
	if (tree === undefined) {
		return undefined;
	}

	return {
		...tree,
		children: tree.children.map((child) => /** @type {TokenTreeBranch} */(fillRaw(child, text, lineOffsets))),
		raw: text.substring(lineOffsets[tree.startLine] + tree.startColumn, lineOffsets[tree.endLine] + tree.endColumn)
	};
}
