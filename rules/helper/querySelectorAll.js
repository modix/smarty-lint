/**
 * @typedef {import('../../lib/rule').TokenTreeBranch} TokenTreeBranch
 * @typedef {import('../../lib/rule').AddErrorFunction} AddErrorFunction
 */

/**
 * @param {TokenTreeBranch} tree
 * @param {RegExp} selector
 * @returns {TokenTreeBranch[]}
 */
module.exports = function querySelectorAll (tree, selector) {
	/** @type  {TokenTreeBranch[]} */
	const matches = [];

	if (tree.children.length > 0) {
		parseChildren(tree.children, tree.name);
	}

	return matches;

	/**
	 * @param {TokenTreeBranch[]} children
	 * @param {string} path
	 * @returns {void}
	 */
	function parseChildren (children, path) {
		for (let i = 0; i < children.length; i++) {
			const scope = `${path}>${children[i].name}`;

			if (selector.test(scope)) {
				matches.push(children[i]);
			}

			if (children[i].children.length > 0) {
				parseChildren(children[i].children, scope);
			}
		}
	}
};
