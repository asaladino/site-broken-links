import { readFileSync } from 'fs';
import Url from '../Model/Url';
import Args from '../Model/Args';
import { join } from "path";

/**
 * Retrieve all the urls for the domain.
 */
class UrlsRepository {

    /**
     * Build the url repo.
     * @param args {Args} passed from the commandline.
     */
    constructor(args) {
        this.args = args;
    }

    /**
     * Find all urls.
     * @returns {[Url]} from the domain.
     */
    findAll() {
        let urlsFile = join(this.args.output.filename, this.args.getSiteName(), 'urls', 'urls.json');
        return JSON.parse(readFileSync(urlsFile).toString()).map(entry => new Url(entry));
    }
}

export default UrlsRepository;