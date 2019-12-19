/* eslint-disable no-console */

const fs = require('fs');
const glob = require('glob');
const path = require('path');

/**
 * @typedef {import('./lib/linter').Failure} Failure
 * @typedef {import('./lib/linter').FailureSeverity} FailureSeverity
 */

const linter = require('./lib/linter');

(async () => {
	try {
		const cwd = process.cwd();

		let totalFailures = 0;
		let filesWithFailures = 0;

		/** @type {{ files?: string[]; rules?: import('./lib/linter').OptionsRules}} */
		let options = {};
		try {
			// eslint-disable-next-line global-require
			options = require(path.resolve(cwd, './smartylint'));
		}
		catch (ex) { /* If 'smartylint.(js|json)' cannot be found in CWD, the linter is using the default settings, so we can ignore this error */ }

		/** @type {{ files: string[]; rules: import('./lib/linter').OptionsRules}} */
		// @ts-ignore
		// eslint-disable-next-line global-require
		const defaultOptions = require('./smartylint');

		await linter.initialize({ rules: options.rules });

		const files = (options.files ? options.files : defaultOptions.files).reduce((resolvedFiles, pattern) => [...resolvedFiles, ...glob.sync(pattern)], /** @type {string[]} */([]));

		for (const fileName of files) {
			const filePath = path.resolve(cwd, fileName);
			// eslint-disable-next-line no-await-in-loop
			const failures = await verifyFile(filePath);

			totalFailures += failures.length;
			filesWithFailures++;

			for (const failure of failures) {
				console.log(`${filePath}:${failure.startLine + 1}:${failure.startColumn + 1}: ${failure.message} [${failure.severity}/${failure.ruleId}]`);
			}
		}

		console.log('');
		if (totalFailures === 0) {
			console.log('No problems found');
		}
		else {
			console.log(totalFailures === 1 ? '1 problem' : `${totalFailures} problems in ${filesWithFailures} of ${files.length} ${(files.length === 1 ? 'file' : 'files')}`);
		}
	}
	catch (error) {
		console.error(error.message);

		// eslint-disable-next-line no-process-exit
		process.exit(-1);
	}
})();

/**
 * Utility to read a file as a promise
 *
 * @param {string} filePath
 * @returns {Promise<Failure[]>}
 */
async function verifyFile (filePath) {
	/** @type {string} */
	let sourceCode;

	try {
		sourceCode = (await readFile(filePath)).toString('utf8');
	}
	catch (error) {
		return [
			{
				ruleId: 'internalFileRead',
				message: error.message,
				startLine: 0,
				startColumn: 0,
				endLine: 0,
				endColumn: 0
			}
		];
	}

	try {
		const failures = await linter.verify(sourceCode, {
			fileName: filePath
		});

		return failures;
	}
	catch (error) {
		return [
			{
				ruleId: 'internalLinterError',
				message: error.stack,
				startLine: 0,
				startColumn: 0,
				endLine: 0,
				endColumn: 0
			}
		];
	}
}

/**
 * Utility to read a file as a promise
 *
 * @param {string} filePath
 * @returns {Promise<Buffer>}
 */
function readFile (filePath) {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, (error, data) => (error ? reject(error) : resolve(data)));
	});
}
