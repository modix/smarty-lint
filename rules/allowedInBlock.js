const querySelectorAll = require('./helper/querySelectorAll');
const querySelector = require('./helper/querySelector');
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
module.exports = function allowedInBlock ({ tree, addError }) {
	const children = querySelectorAll(tree, /(^|>)(blockForElse|blockForEachElse|blockElseIf|blockElse|blockSectionElse)$/);

	for (const child of children) {
		const parent = getParent(tree, getParent(tree, child));

		if (parent !== null) {
			switch (child.name) {
				case 'blockForElse': {
					if (parent.name !== 'blockFor') {
						addError({
							message: `The parent of "{forelse}" must be "{for}", but found "${parent.name}".`,
							startLine: child.startLine,
							startColumn: child.startColumn,
							endLine: child.endLine,
							endColumn: child.endColumn
						});
					}
					break;
				}

				case 'blockForEachElse': {
					if (parent.name !== 'blockForEach') {
						addError({
							message: `The parent of "{foreachelse}" must be "{foreach}", but found "${parent.name}".`,
							startLine: child.startLine,
							startColumn: child.startColumn,
							endLine: child.endLine,
							endColumn: child.endColumn
						});
					}
					break;
				}

				case 'blockElseIf': {
					const identifier = querySelector(parent, /^block>identifier(>|$)/);

					if ((parent.name !== 'blockCondition' || (identifier !== null && identifier.raw.toLowerCase() !== 'if')) && parent.name !== 'blockElseIf') {
						addError({
							message: `The parent of "{elseif}" must be "{if}" or "{elseif}", but found "${parent.name}".`,
							startLine: child.startLine,
							startColumn: child.startColumn,
							endLine: child.endLine,
							endColumn: child.endColumn
						});
					}
					break;
				}

				case 'blockElse': {
					const identifier = querySelector(parent, /^block>identifier(>|$)/);

					if ((parent.name !== 'blockCondition' || (identifier !== null && identifier.raw.toLowerCase() !== 'if')) && parent.name !== 'blockElseIf') {
						addError({
							message: `The parent of "{else}" must be "{if}" or "{elseif}", but found "${parent.name}".`,
							startLine: child.startLine,
							startColumn: child.startColumn,
							endLine: child.endLine,
							endColumn: child.endColumn
						});
					}
					break;
				}

				case 'blockSectionElse': {
					const identifier = querySelector(parent, /^block>identifier(>|$)/);

					if (parent.name !== 'block' || (identifier !== null && identifier.raw.toLowerCase() !== 'section')) {
						addError({
							message: `The parent of "{sectionelse}" must be "{section}", but found "${parent.name}".`,
							startLine: child.startLine,
							startColumn: child.startColumn,
							endLine: child.endLine,
							endColumn: child.endColumn
						});
					}
					break;
				}
			}
		}
	}
};
