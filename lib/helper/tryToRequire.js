const path = require('path');

/** @typedef {import('../rule').RuleFunction} RuleFunction */

/**
 * Returns a rule, specified by it's name
 *
 * @param {string} moduleName
 * @returns {[string, RuleFunction] | undefined}
 */
module.exports = function tryToRequire (moduleName) {
	const filePath = path.resolve(moduleName);

	try {
		// eslint-disable-next-line global-require
		return [filePath, require(filePath)];
	}
	catch (ex) {
		return undefined;
	}
};
