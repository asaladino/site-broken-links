const FileDetails = require('./FileDetails');
const path = require("path");
const fs = require("fs");

/**
 * Commandline arguments being passed to the app.
 */
class Args {
    constructor(params) {
        /**
         * Project directory to output the app results.
         * @type {FileDetails|null}
         */
        this.output = null;
        /**
         * Domain being indexed.
         * @type {string|*}
         */
        /**
         * Domain being indexed.
         * @type {string|*}
         */
        this.domain = null;
         /**
         * The base url of the site being indexed.
         * @type {string|*}
         */
        this.baseUrl = null;
        /**
         * Should progress information be output to the console?
         * @type {boolean}
         */
        this.verbose = true;

         /**
         * Should progress information be output to the console?
         * @type {boolean}
         */
        this.rescan = false;
        Object.assign(this, params);
    }

    /**
     * If the mandatory options are not passed then show the menu.
     * @returns {boolean} true if the mandatory options are not passed.
     */
    shouldShowHelp() {
        return this.hasOwnProperty('help') || (this.domain === null || this.output === null || this.baseUrl === null);
    }

    /**
     * Get the site name from the domain.
     * @returns {string} the site name.
     */
    getSiteName() {
        return this.domain.replace(/[.]/g, '_');
    }

    /**
     * Get the project folder which the output + the site name. Also, it will be created if it doesn't exist.
     * @returns {string} the project path.
     */
    getProjectPath() {
        let siteName = this.getSiteName();
        let projectPath = path.join(this.output.filename, siteName);
        if (!fs.existsSync(projectPath)) {
            fs.mkdirSync(projectPath);
        }
        return projectPath;
    }
}

module.exports = Args;