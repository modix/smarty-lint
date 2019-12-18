/**
 * Change rule names with dashes into camel cased rule names
 *
 * @param {string} ruleName
 * @returns {string}
 */
module.exports = function capitalizeRuleName (ruleName) {
	return ruleName.replace(/[^/]+$/u, (fileName) => fileName.replace(/-[a-z]/giu, (match) => match.substr(1).toUpperCase()));
};
