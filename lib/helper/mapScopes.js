const SCOPE_MAPPING = require('../SCOPE_MAPPING');

/**
 * Replaces the tmLanguage-scope names by names, which will be used for further processing.
 *
 * @param {string} scopes
 * @returns {string}
 */
module.exports = function mapScopes (scopes) {
	return SCOPE_MAPPING.reduce((scopes, { from, to }) => scopes.replace(from, to), scopes);
}
