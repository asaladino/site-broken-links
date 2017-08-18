const fs = require("fs");
const LinkCheck = require("../Model/LinkCheck");

class LinkCheckRepository {
    constructor(file) {
        this._file = file;
    }

    /**
     * Find all the urls to check for broken links
     * @returns {Promise}
     */
    findAll() {
        return new Promise((resolve, reject) => {
            let linkChecks = [];
            fs.readFile(this._file, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    data.split(/\r?\n/)
                        .filter(url => url !== '')
                        .forEach(function (url) {
                            let linkCheck = new LinkCheck(url);
                            linkChecks.push(linkCheck);
                        });
                    resolve(linkChecks);
                }
            });
        });
    }

    /**
     * Write the broken links to file.
     * @param linkChecks {LinkCheck[]}
     */
    write(linkChecks) {
        linkChecks.forEach(linkCheck => {
            linkCheck.broken.forEach(broke => {
                fs.appendFile('broken/' + linkCheck.file, broke + "\n", function (err) {
                    if (err) throw err;
                });
            });
        });
    }

}

module.exports = LinkCheckRepository;