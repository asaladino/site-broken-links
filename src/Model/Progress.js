const Url = require('./Url');

/**
 * Class for reporting the progress.
 */
class Progress {

    /**
     * Build a progress object.
     * @param url {Url|null} current url
     * @param total {number} total urls to process.
     */
    constructor(url = null, total = 0) {
        this.url = url;
        this.total = total;
        this.progress = 0;
    }

    /**
     * Display something meaning full about the progress.
     * @returns {String}
     */
    toString() {
        return this.total + ' | ' + this.progress + ' :: retrieving: ' + (this.url === null ? null : this.url.url);
    }

    /**
     * Something to report in the logs.
     * @return {{urlsPoolLength: number, urlsLength: number, url: string}}
     */
    toLog() {
        return {
            total: this.total,
            progress: this.progress,
            url: this.url === null ? null : this.url.url
        }
    }

    /**
     * Update the progress.
     * @param url {Url} that was just processed.
     */
    update(url) {
        this.url = {
            name: url.name,
            url: url.url
        };
        this.progress++;
    }

    /**
     * Just updating the url.
     * @param url {Url} that was checked.
     */
    checked(url) {
        this.url = {
            name: url.name,
            url: url.url
        }
    }
}

module.exports = Progress;