/**
 * @typedef {import('../../lib/rule').TokenTreeBranch} TokenTreeBranch
 * @typedef {import('../../lib/rule').AddErrorFunction} AddErrorFunction
 */

/**
 * @param {TokenTreeBranch} tree
 * @param {TokenTreeBranch | null} child
 * @returns {TokenTreeBranch | null}
 */
module.exports = function getParent (tree, child) {
	if (child === null || tree.children.length === 0) {
		return null;
	}

	return parse(tree);

	/**
	 * @param {TokenTreeBranch} parent
	 * @returns {TokenTreeBranch | null}
	 */
	function parse (parent) {
		if (parent.children.length > 0) {
			for (let i = 0; i < parent.children.length; i++) {
				if (parent.children[i] === child) {
					return parent;
				}

				const result = parse(parent.children[i]);

				if (result !== null) {
					return result;
				}
			}
		}

		return null;
	}
};
