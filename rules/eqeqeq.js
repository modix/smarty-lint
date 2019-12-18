const querySelectorAll = require('./helper/querySelectorAll');

/**
 * @typedef {import('../lib/rule').TokenTreeBranch} TokenTreeBranch
 * @typedef {import('../lib/rule').AddErrorFunction} AddErrorFunction
 */

const REPLACEMENT_MAP = {
	'!=': '!==',
	'==': '===',
	'and': '&&',
	'or': '||',
	'eq': '===',
	'neq': '!==',
	'ne': '!==',
	'gte': '>=',
	'gt': '>',
	'ge': '>=',
	'lte': '<=',
	'lt': '<',
	'le': '<=',
	'mod': '%'
};

/**
 * @param {object} options
 * @param {TokenTreeBranch} options.tree
 * @param {AddErrorFunction} options.addError
 * @param {string[]} options.ignore
 * @returns {void}
 */
module.exports = function eqeqeq ({ tree, addError, ignore }) {
	const operators = querySelectorAll(tree, /(^|>)(logicalOperator)$/u);

	for (const operator of operators) {
		if (REPLACEMENT_MAP[operator.raw] !== undefined && (!ignore || !ignore.includes(operator.raw))) {
			addError({
				message: `Use "${REPLACEMENT_MAP[operator.raw]}" instead of "${operator.raw}".`,
				startLine: operator.startLine,
				startColumn: operator.startColumn,
				endLine: operator.endLine,
				endColumn: operator.endColumn
			});
		}
	}
};
