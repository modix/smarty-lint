const querySelectorAll = require('./helper/querySelectorAll');
const getParent = require('./helper/getParent');

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
module.exports = function emptyBlock ({ tree, addError }) {
	const children = querySelectorAll(tree, /(^|>)(openEnd)$/u);

	for (const child of children) {
		const parent = getParent(tree, child);

		if (parent !== null) {
			if (parent.children[parent.children.length - 1].name === 'openEnd') {
				// Handling for else-blocks

				addError({
					message: 'Unnecessary empty block.',
					startLine: parent.startLine,
					startColumn: parent.startColumn,
					endLine: parent.endLine,
					endColumn: parent.endColumn
				});
			}
			else if (['block', 'blockCondition', 'blockLiteral'].includes(parent.name)) {
				// Handling for other block types

				const index = parent.children.indexOf(child);

				if (['close', 'blockLiteralClose'].includes(parent.children[index + 1].name)) {
					addError({
						message: 'Unnecessary empty block.',
						startLine: parent.startLine,
						startColumn: parent.startColumn,
						endLine: parent.endLine,
						endColumn: parent.endColumn
					});
				}
			}
		}
	}
};
