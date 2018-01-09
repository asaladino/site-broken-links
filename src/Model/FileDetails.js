const fs = require("fs");

/**
 * Convenience class for checking if a file exists.
 */
class FileDetails {

    constructor(filename) {
        /**
         * File name to get details for.
         * @type {string}
         */
        this.filename = filename;
    }

    /**
     * If the file does not exist, throw an exception.
     * @throws file not found exception.
     */
    doesFolderExist() {
        if (!fs.existsSync(this.filename)) {
            throw 'Output folder not found:' + this.filename;
        }
    }
}

module.exports = FileDetails;