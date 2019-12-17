/**
 * @typedef {import('../lib/rule').TokenTreeBranch} TokenTreeBranch
 * @typedef {import('../lib/rule').AddErrorFunction} AddErrorFunction
 */

/**
 * @param {object} options
 * @param {TokenTreeBranch} options.tree
 * @param {AddErrorFunction} options.addError
 * @param {string[]} options.functions
 * @param {string[]} options.modifiers
 * @returns {void}
 */
module.exports = function deprecatedFunctionNames ({ tree, addError, functions, modifiers }) {
	if (tree.children.length > 0) {
		parseChildren(tree.name, tree.children);
	}

	/**
	 * @param {string} parentName
	 * @param {TokenTreeBranch[]} children
	 * @returns {void}
	 */
	function parseChildren (parentName, children) {
		for (let i = 0; i < children.length; i++) {
			if (parentName === 'function' && children[i].name === 'identifier') {
				if (functions.includes(children[i].raw)) {
					addError({
						message: `Deprecated function "${children[i].raw}" should not be used.`,
						startLine: children[i].startLine,
						startColumn: children[i].startColumn,
						endLine: children[i].endLine,
						endColumn: children[i].endColumn
					});
				}
			}
			else if (parentName === 'modifier' && children[i].name === 'identifier') {
				if (modifiers.includes(children[i].raw)) {
					addError({
						message: `Deprecated modifier "${children[i].raw}" should not be used.`,
						startLine: children[i].startLine,
						startColumn: children[i].startColumn,
						endLine: children[i].endLine,
						endColumn: children[i].endColumn
					});
				}
			}

			if (children[i].children.length > 0) {
				parseChildren(children[i].name, children[i].children);
			}
		}
	}
};
