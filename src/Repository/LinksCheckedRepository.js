import Database from 'better-sqlite3';
import { existsSync, mkdirSync, copyFileSync } from 'fs';
import Args from '../Model/Args';
import LinkChecked from '../Model/LinkChecked';
import { join, dirname } from "path";

export default class LinksCheckedRepository {
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
        this.insertStatement = this.db.prepare('INSERT INTO links_checked VALUES (?, ?)');
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
        this.insertStatement.run([linkChecked.url, linkChecked.working ? 1 : 0]);
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
        this.folder = join(this.args.output.filename, this.args.getSiteName(), 'broken_links');
        if (!existsSync(this.folder)) {
            mkdirSync(this.folder)
        }
        this.databaseFile = join(this.folder, 'links_checked.sqlite');


        if (!existsSync(this.databaseFile)) {
            let tempDbFile = join(dirname(__filename), '../Asset/links_checked.sqlite');

            copyFileSync(tempDbFile, this.databaseFile)
        }
    }

}