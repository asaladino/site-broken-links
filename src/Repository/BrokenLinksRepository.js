import { writeFileSync, existsSync, mkdirSync } from 'fs';
import Url from '../Model/Url';
import Args from '../Model/Args';
import { join } from "path";

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

export default BrokenLinksRepository;