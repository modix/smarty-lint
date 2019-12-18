const querySelectorAll = require('./helper/querySelectorAll');

/**
 * @typedef {import('../lib/rule').TokenTreeBranch} TokenTreeBranch
 * @typedef {import('../lib/rule').AddErrorFunction} AddErrorFunction
 */

/**
 * @param {object} options
 * @param {TokenTreeBranch} options.tree
 * @param {AddErrorFunction} options.addError
 * @returns {void}
 */
module.exports = function emptyComment ({ tree, addError }) {
	const parents = querySelectorAll(tree, /(^|>)(comment)$/u);

	for (const parent of parents) {
		if (
			// No content
			(parent.children.length === 2) ||

			// Only space as content
			(parent.children.length === 3 && (/^\s*$/u).test(parent.children[1].raw))
		) {
			addError({
				message: 'Unnecessary empty comment.',
				startLine: parent.startLine,
				startColumn: parent.startColumn,
				endLine: parent.endLine,
				endColumn: parent.endColumn
			});
		}
	}
};
