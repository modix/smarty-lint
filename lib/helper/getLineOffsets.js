/**
 * Get an array of start-offsets from an array of strings.
 *
 * @param {string[]} lines
 * @returns {number[]}
 */
module.exports = function getLineOffsets (lines) {
	/** @type {number[]} */
	const offsets = new Array(lines.length);

	let currentOffset = 0;

	for (let line = 0; line < lines.length; line++) {
		offsets[line] = currentOffset;

		currentOffset += lines[line].length + 1;
	}

	return offsets;
};
