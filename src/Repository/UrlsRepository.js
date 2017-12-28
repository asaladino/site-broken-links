const fs = require('fs');
const Url = require('../Model/Url');
const Args = require('../Model/Args');
const Option = require('../Model/Option');
const path = require("path");

class UrlsRepository {
    /**
     * @param option {Option}
     * @param args {Args}
     */
    constructor(option, args) {
        this.option = option;
        this.args = args;
    }

    /**
     * Find urls for range specified in the Pa11yLogin
     * @returns {[Url]}
     */
    findForRange() {
        let urlsFile = path.join(this.args.output.filename, this.args.getSiteName(), 'urls', 'urls.json');
        /** @type [object] */
        let urlsArray = JSON.parse(fs.readFileSync(urlsFile).toString());
        return urlsArray
            .slice(this.option.a11y.pa11yLogin.startUrl, this.option.a11y.pa11yLogin.endUrl)
            .map(entry =>  new Url(entry.name, entry.url, entry.fragment));
    }
}

module.exports = UrlsRepository;