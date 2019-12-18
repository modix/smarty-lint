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
module.exports = function unclosedBlock ({ tree, addError }) {
	/** @type {TokenTreeBranch[]} */
	const lastChildren = parseChildren(tree);

	for (let i = lastChildren.length - 1; i > 1; i--) {
		const child = lastChildren[i];

		if (child.name === 'blockContent') {
			/** @type {TokenTreeBranch | undefined} */
			const identifier = lastChildren[i - 1].children.find(({ name }) => name === 'identifier');

			addError({
				message: `Unclosed ${(identifier ? `"{${identifier.raw}}" ` : '')}block. Make sure the order of closing tags is correct and every HTML-tag inside the block is closed.`,
				startLine: child.startLine,
				startColumn: child.startColumn,
				endLine: child.endLine,
				endColumn: child.endColumn
			});

			break;
		}
	}
};

/**
 * @param {TokenTreeBranch} parent
 * @returns {TokenTreeBranch[]}
 */
function parseChildren (parent) {
	if (parent.children.length > 0) {
		const lastChild = parent.children[parent.children.length - 1];

		return [lastChild, ...parseChildren(lastChild)];
	}

	return [];
}
