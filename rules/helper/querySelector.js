/**
 * @typedef {import('../../lib/rule').TokenTreeBranch} TokenTreeBranch
 * @typedef {import('../../lib/rule').AddErrorFunction} AddErrorFunction
 */

/**
 * @param {TokenTreeBranch} tree
 * @param {RegExp} selector
 * @returns {TokenTreeBranch | null}
 */
module.exports = function querySelector (tree, selector) {
	if (tree.children.length === 0) {
		return null;
	}

	return parseChildren(tree.children, tree.name);

	/**
	 * @param {TokenTreeBranch[]} children
	 * @param {string} path
	 * @returns {TokenTreeBranch | null}
	 */
	function parseChildren (children, path) {
		for (let i = 0; i < children.length; i++) {
			const scope = `${path}>${children[i].name}`;

			if (selector.test(scope)) {
				return children[i];
			}

			if (children[i].children.length > 0) {
				const result = parseChildren(children[i].children, scope);

				if (result !== null) {
					return result;
				}
			}
		}

		return null;
	}
};
