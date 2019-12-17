const fs = require('fs');

/**
 * Utility to read a file as a promise
 *
 * @param {string} filePath
 * @returns {Promise<Buffer>}
 */
module.exports = function readFile (filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (error, data) => (error ? reject(error) : resolve(data)));
    })
}
