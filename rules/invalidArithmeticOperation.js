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
module.exports = function invalidArithmeticOperation ({ tree, addError }) {
	parseChildren(tree.children);

	/**
	 * @param {TokenTreeBranch[]} children
	 * @returns {void}
	 */
	function parseChildren (children) {
		for (let i = 0; i < children.length; i++) {
			if (children[i].name === 'operation') {
				if (i === 0 || ['begin', 'separator'].includes(children[i - 1].name)) {
					if (children[i].children[0].name !== 'arithmeticOperator' || (children[i].children[0].raw !== '+' && children[i].children[0].raw !== '-')) {
						addError({
							message: 'Left-operand missing in operation.',
							startLine: children[i].startLine,
							startColumn: children[i].startColumn,
							endLine: children[i].endLine,
							endColumn: children[i].endColumn
						});
					}
				}
				else if (![
					'begin',
					'array',
					'assignmentOperator',
					'constant',
					'doubleQuotedString',
					'encapsulatedExpression',
					'identifier',
					'modifier',
					'negation',
					'number',
					'operation',
					'separator',
					'singleQuotedString',
					'smartyBlock',
					'stepKeyword',
					'unquotedString',
					'variable'
				].includes(children[i - 1].name)) {
					addError({
						message: `Invalid left-operand type "${children[i - 1].name}" in operation.`,
						startLine: children[i - 1].startLine,
						startColumn: children[i - 1].startColumn,
						endLine: children[i].endLine,
						endColumn: children[i].endColumn
					});
				}
			}

			if (children[i].children.length > 0) {
				parseChildren(children[i].children);
			}
		}
	}
};
