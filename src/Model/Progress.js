// @flow

import Url from "./Url";
import Link from "./Link";

/**
 * Class for reporting the progress.
 */
export default class Progress {
    url: Url;
    total: number;
    progress: number;
    working: boolean;

    /**
     * Build a progress object.
     * @param url {Url|null} current url
     * @param total {number} total urls to process.
     */
    constructor(url: Url, total: number) {
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
        let url = this.url !== null ? this.url.url : '';
        return `${this.total} | ${this.progress} :: tested - ${this.working ? 'working' : 'broken'} - ${url}`;
    }

    /**
     * Something to report in the logs.
     * @return {{urlsPoolLength: number, urlsLength: number, url: string}}
     */
    toLog(): Object {
        return {
            total: this.total,
            progress: this.progress,
            working: this.working,
            url: this.url !== null ? this.url.url : ''
        };
    }

    /**
     * Update the progress.
     * @param url {Url} that was just processed.
     */
    update(url: Url) {
        this.url = new Url({...url});
        this.progress++;
    }

    /**
     * Just updating the url.
     * @param link {Link} that was checked.
     */
    checked(link: Link) {
        this.url = new Url({name: link.title, url: link.url});
        this.working = link.working;
    }
}
