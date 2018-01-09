const FileDetails = require('./FileDetails');

class Args {
    constructor(params) {
        /**
         * Project directory to output the index results.
         * @type {FileDetails|null}
         */
        this.output = null;
        /**
         * Domain being indexed.
         * @type {string|*}
         */
        this.domain = null;
        /**
         * Should progress information be output to the console?
         * @type {boolean}
         */
        this.verbose = true;
        Object.assign(this, params);
    }

    shouldShowHelp() {
        return this.hasOwnProperty('help') || !this.domain || !this.output;
    }

    getSiteName() {
        return this.domain.replace(/[.]/g, '_');
    }
}

module.exports = Args;