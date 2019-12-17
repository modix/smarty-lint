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
 * @param {string[]} options.ignore
 * @returns {void}
 */
module.exports = function unquotedString ({ tree, addError, ignore }) {
	const matches = querySelectorAll(tree, /(^|>)unquotedString$/);

	for (const match of matches) {
		const parent = getParent(tree, match);

		if (!parent || !ignore || !ignore.includes(parent.name)) {
			addError({
				message: 'Don\'t use unquoted strings. Always use single- or double-quoted strings to prevent misinterpretation.',
				startLine: match.startLine,
				startColumn: match.startColumn,
				endLine: match.endLine,
				endColumn: match.endColumn
			});
		}
	}
};
