const fs = require('fs');
const Url = require('../Model/Url');
const Args = require('../Model/Args');
const path = require("path");

/**
 * Saves the broken links to file in json format.
 */
class BrokenLinksRepository {
    /**
     * Create a broken links repo.
     * @param args {Args} from the commandline.
     */
    constructor(args) {
        /**
         * From the commandline.
         * @type {Args}
         */
        this.args = args;
        /**
         * Folder to save the broken links to.
         * @type {string} full path to the broken links folder in the project.
         */
        this.folder = '';
        this.createBrokenLinksFolder();
    }

    /**
     * Saves any broken link urls to a json file.
     * @returns {Url} to save to the folder.
     */
   save(url) {
        let file = path.join(this.folder, url.name + '.json');
        if (url.broken && url.broken.length) {
            let json = JSON.stringify(url.broken);
            fs.writeFileSync(file, json);
        }
    }

    /**
     * Creates a broken links folder in the project folder.
     */
    createBrokenLinksFolder() {
        this.folder = path.join(this.args.output.filename, this.args.getSiteName(), 'broken_links');
        if (!fs.existsSync(this.folder)) {
            fs.mkdirSync(this.folder)
        }
    }
}

module.exports = BrokenLinksRepository;
