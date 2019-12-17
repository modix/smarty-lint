/** @typedef {import('../rule').RuleFunction} RuleFunction */

const path = require('path');

const capitalizeRuleName = require('./capitalizeRuleName');
const tryToRequire = require('./tryToRequire');

/**
 * Returns a rule, specified by it's name
 *
 * @param {string} ruleName
 * @returns {[string, RuleFunction] | undefined}
 */
module.exports = function requireRule (ruleName) {
	const fileName = `${capitalizeRuleName(ruleName)}.js`;

	if (/\//.test(ruleName)) {
		return (
			tryToRequire(path.join(process.cwd(), fileName)) ||
			tryToRequire(fileName.replace(/\/([^\/]+)$/iu, '/rules/$1')) ||
			tryToRequire(fileName)
		);
	}

	return (
		tryToRequire(path.join(process.cwd(), fileName)) ||
		tryToRequire(path.join(process.cwd(), 'rules',  fileName)) ||
		tryToRequire(path.join(__dirname, '../../rules', fileName))
	);
}
