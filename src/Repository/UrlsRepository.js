// @flow
import {readFileSync} from 'fs';
import Url from '../Model/Url';
import Args from '../Model/Args';
import {join} from "path";

/**
 * Retrieve all the urls for the domain.
 */
export default class UrlsRepository {
    /**
     * Args passed from the commandline.
     */
    args: Args;

    /**
     * Build the url repo.
     * @param args {Args} passed from the commandline.
     */
    constructor(args: Args) {
        this.args = args;
    }

    /**
     * Find all urls.
     */
    findAll(): Url[] {
        let urlsFile = join(this.args.output.filename, this.args.getSiteName(), 'urls', 'urls.json');
        return JSON.parse(readFileSync(urlsFile).toString()).map(entry => new Url(entry));
    }
}
