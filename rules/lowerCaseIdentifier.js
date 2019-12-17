const querySelectorAll = require('./helper/querySelectorAll');
const getParent = require('./helper/getParent');

/**
 * @typedef {import('../lib/rule').TokenTreeBranch} TokenTreeBranch
 * @typedef {import('../lib/rule').AddErrorFunction} AddErrorFunction
 */

const UPPERCASE_REG_EXP = /[A-Z]/u;

/**
 * @param {object} options
 * @param {TokenTreeBranch} options.tree
 * @param {AddErrorFunction} options.addError
 * @param {string[]} options.ignore
 * @returns {void}
 */
module.exports = function lowerCaseIdentifier ({ tree, addError, ignore }) {
	const matches = querySelectorAll(tree, /(^|>)(arithmeticOperator|constant|identifier|logicalOperator)$/);

	for (const match of matches) {
		let type;

		if (['arithmeticOperator', 'constant', 'logicalOperator'].includes(match.name)) {
			type = match.name;
		}
		else {
			const parent = getParent(tree, match);

			if (parent === null) {
				continue;
			}

			type = parent.name;
		}

		if ((!ignore || !ignore.includes(type)) && UPPERCASE_REG_EXP.test(match.raw)) {
			addError({
				message: `"${match.raw}" (${type}) should be written in lower-case.`,
				startLine: match.startLine,
				startColumn: match.startColumn,
				endLine: match.endLine,
				endColumn: match.endColumn
			});
		}
	}
};
