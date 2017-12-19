const FileDetails = require('./FileDetails');

class Args {
    constructor(params) {
        /**
         * @type FileDetails
         */
        this.output = null;
        /**
         * @type {string}
         */
        this.domain = null;
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