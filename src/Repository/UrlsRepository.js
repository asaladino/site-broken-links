const fs = require('fs');
const Url = require('../Model/Url');
const Args = require('../Model/Args');
const path = require("path");

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
        let urlsFile = path.join(this.args.output.filename, this.args.getSiteName(), 'urls', 'urls.json');
        return JSON.parse(fs.readFileSync(urlsFile).toString()).map(entry => new Url(entry));
    }
}

module.exports = UrlsRepository;