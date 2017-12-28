const fs = require('fs');
const Url = require('../Model/Url');
const Args = require('../Model/Args');
const Option = require('../Model/Option');
const path = require("path");

class BrokenLinksRepository {
    /**
     * @param option {Option}
     * @param args {Args}
     */
    constructor(option, args) {
        this.option = option;
        this.args = args;
        /**
         * @type {string}
         */
        this.folder = '';
        this.createBrokenLinksFolder();
    }

    /**
     * Saves any broken link urls to a json file.
     * @returns {Url}
     */
    save(url) {
        let file = path.join(this.folder, url.name + '.json');
        let json = JSON.stringify(url.broken);
        fs.writeFileSync(file, json);
    }

    createBrokenLinksFolder() {
        this.folder = path.join(this.args.output.filename, this.args.getSiteName(), 'broken_links');
        if (!fs.existsSync(this.folder)) {
            fs.mkdirSync(this.folder)
        }
    }

}

module.exports = BrokenLinksRepository;