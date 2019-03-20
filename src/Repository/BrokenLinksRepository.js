// @flow
import {writeFileSync, existsSync, mkdirSync} from 'fs';
import Url from '../Model/Url';
import Args from '../Model/Args';
import {join} from "path";

/**
 * Saves the broken links to file in json format.
 */
export default class BrokenLinksRepository {

    /**
     * From the commandline.
     */
    args: Args;
    /**
     * Folder to save the broken links to.
     */
    folder: string;

    /**
     * Create a broken links repo.
     */
    constructor(args: Args) {
        this.args = args;
        this.folder = '';
        this.createBrokenLinksFolder();
    }

    /**
     * Saves any broken link urls to a json file.
     */
    save(url: Url) {
        let file = join(this.folder, url.name + '.json');
        let json = JSON.stringify(url.links);
        writeFileSync(file, json);
    }

    /**
     * Creates a broken links folder in the project folder.
     */
    createBrokenLinksFolder() {
        this.folder = join(this.args.output.filename, this.args.getSiteName(), 'broken_links');
        if (!existsSync(this.folder)) {
            mkdirSync(this.folder)
        }
    }
}
