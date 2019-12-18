const path = require('path');

const requireRule = require('./requireRule');

/**
 * @typedef {import('../linter').OptionsRules} OptionsRules
 * @typedef {import('../linter').LinterRule} LinterRule
 */

/**
 * Load user specified rules and setup options object.
 *
 * @param {OptionsRules} userRules
 * @returns {LinterRule[]}
 */
module.exports = function initRules (userRules) {
	/** @type {LinterRule[]} */
	const linterRules = [];

	const rules = {
		// eslint-disable-next-line global-require
		...require(path.join(__dirname, '../../smartylint.json')).rules,
		...userRules
	};

	for (const ruleName in rules) {
		if (Object.prototype.hasOwnProperty.call(rules, ruleName)) {
			/** @type {Partial<LinterRule>} */
			const linterRule = {
				name: ruleName
			};

			if (typeof rules[ruleName] === 'string') {
				if (rules[ruleName] === 'off') {
					// eslint-disable-next-line no-continue
					continue;
				}

				linterRule.severity = rules[ruleName];
				linterRule.options = {};
			}
			else if (Array.isArray(rules[ruleName])) {
				if (rules[ruleName][0] === 'off') {
					// eslint-disable-next-line no-continue
					continue;
				}

				if (rules[ruleName].length === 1) {
					linterRule.severity = rules[ruleName];
					linterRule.options = {};
				}
				else {
					// eslint-disable-next-line max-depth
					if (typeof rules[ruleName][1] !== 'object') {
						throw new Error(`Invalid type of rule "${ruleName}" options.`);
					}

					linterRule.severity = rules[ruleName][0];
					linterRule.options = rules[ruleName][1];
				}
			}
			else {
				throw new Error(`Invalid type of rule "${ruleName}" object.`);
			}

			const ruleModule = requireRule(ruleName);

			if (ruleModule !== undefined) {
				const [filePath, exec] = ruleModule;

				const previousRuleWithSameFilePath = linterRules.find((rule) => rule.filePath === filePath);
				if (previousRuleWithSameFilePath) {
					throw new Error(`"${filePath}" cannot be loaded twice in rules "${previousRuleWithSameFilePath.name}" and "${linterRule.name}".`);
				}

				linterRule.filePath = filePath;
				linterRule.exec = exec;

				linterRules.push(/** @type {LinterRule} */(linterRule));
			}
			else {
				throw new Error(`Unable to find "${ruleName}" rule.`);
			}
		}
	}

	return linterRules;
};
