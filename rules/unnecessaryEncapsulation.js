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
module.exports = function unnecessaryEncapsulation ({ tree, addError }) {
	const containers = querySelectorAll(tree, /(^|>)(encapsulatedExpression|propertyExpression|smartyBlock)$/);

	for (const container of containers) {
		// begin | * | end
		if (container.children.length === 3) {
			const child = container.children[1];

			if (container.name === 'encapsulatedExpression') {
				addError({
					message: `Unnecessary encapsulation in parentheses.`,
					startLine: container.startLine,
					startColumn: container.startColumn,
					endLine: container.endLine,
					endColumn: container.endColumn
				});
			}
			else if (container.name === 'propertyExpression') {
				if (child.name === 'smartyBlock') {
					addError({
						message: `Unnecessary encapsulation in braces.`,
						startLine: child.startLine,
						startColumn: child.startColumn,
						endLine: child.endLine,
						endColumn: child.endColumn
					});
				}
			}
			else if (container.name === 'smartyBlock') {
				if (['constant', 'doubleQuotedString', 'number', 'singleQuotedString', 'smartyBlock', 'unquotedString'].includes(child.name)) {
					addError({
						message: `Unnecessary encapsulation in braces.`,
						startLine: container.startLine,
						startColumn: container.startColumn,
						endLine: container.endLine,
						endColumn: container.endColumn
					});
				}
			}
		}
	}
};
