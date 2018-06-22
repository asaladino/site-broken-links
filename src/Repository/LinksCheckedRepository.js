const Database = require('better-sqlite3');
const fs = require('fs');
const Args = require('../Model/Args');
const LinkChecked = require('../Model/LinkChecked');
const path = require("path");

class LinksCheckedRepository {
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

        this.db = new Database(this.databaseFile, {});
        this.insertStatment = this.db.prepare('INSERT INTO links_checked VALUES (?, ?)');
    }

    /**
     * Find a checked link give a link.
     * @param link {Link}
     * @return {LinkChecked}
     */
    find(link) {
        return this.db.prepare('SELECT * FROM links_checked WHERE url=?').get(link.url);
    }

    /**
     * Save the checked link.
     * @param linkChecked {LinkChecked}
     */
    save(linkChecked) {
        this.insertStatment.run([linkChecked.url, linkChecked.working ? 1 : 0]);
    }

    /**
     * Close the database when done.
     */
    close() {
        this.db.close();
    }

    /**
     * Creates a broken links folder in the project folder.
     */
    createBrokenLinksFolder() {
        this.folder = path.join(this.args.output.filename, this.args.getSiteName(), 'broken_links');
        if (!fs.existsSync(this.folder)) {
            fs.mkdirSync(this.folder)
        }
        this.databaseFile = path.join(this.folder, 'links_checked.sqlite');


        if (!fs.existsSync(this.databaseFile)) {
            let tempDbFile = path.join(path.dirname(__filename), '../Asset/links_checked.sqlite');

            fs.copyFileSync(tempDbFile, this.databaseFile)
        }
    }

}

module.exports = LinksCheckedRepository;