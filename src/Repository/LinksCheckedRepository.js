// @flow
import Database from 'better-sqlite3';
import {existsSync, mkdirSync, copyFileSync} from 'fs';
import Args from '../Model/Args';
import LinkChecked from '../Model/LinkChecked';
import {join, dirname} from "path";

type SqliteDatabase = {
    prepare: (statement: string) => any;
    close: () => void;
};

export default class LinksCheckedRepository {

    db: SqliteDatabase;
    /**
     * From the commandline.
     */
    args: Args;
    /**
     * Folder to save the broken links to.
     */
    folder: string;
    /**
     * Location of the database file.
     */
    databaseFile: string;
    /**
     * Reusable insert statement.
     */
    insertStatement: any;

    /**
     * Create a broken links repo.
     * @param args {Args} from the commandline.
     */
    constructor(args: Args) {
        this.args = args;
        this.folder = '';
        this.createBrokenLinksFolder();
        this.db = new Database(this.databaseFile, {});
        this.insertStatement = this.db.prepare('INSERT INTO links_checked VALUES (?, ?)');
    }

    /**
     * Find a checked link give a link.
     */
    find(link: LinkChecked): any {
        return this.db.prepare('SELECT * FROM links_checked WHERE url=?').get(link.url);
    }

    /**
     * Save the checked link.
     */
    save(linkChecked: LinkChecked) {
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