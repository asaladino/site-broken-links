const Url = require('./Url');
const Link = require('./Link');

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
        this.working = true;
    }

    /**
     * Display something meaning full about the progress.
     * @returns {String}
     */
    toString() {
        return this.total + ' | ' +
            this.progress + ' :: tested - ' +
            (this.working ? 'working' : 'broken ') + ' - ' +
            (this.url === null ? null : this.url.url);
    }

    /**
     * Something to report in the logs.
     * @return {{urlsPoolLength: number, urlsLength: number, url: string}}
     */
    toLog() {
        return {
            total: this.total,
            progress: this.progress,
            working: this.working,
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
     * @param link {Link} that was checked.
     */
    checked(link) {
        this.url = {
            name: link.title,
            url: link.url
        }
        this.working = link.working;
    }
}

module.exports = Progress;