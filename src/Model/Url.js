/**
 * Url found on the site.
 */
class Url {
    constructor(entry) {
        /**
         * Kind of like a id for file names and look up.
         * @type {string}
         */
        this.name = '';
        /**
         * Full url found on the site.
         * @type {string}
         */
        this.url = '';
        /**
         * A list of urls found on the page that are broken.
         * @type {[string]}
         */
        this.broken = [];
        Object.assign(this, entry);
    }

    /**
     * Add a broken url for the page.
     * @param url {string} that is broken.
     */
    addBroken(url) {
        this.broken.push(url);
    }
}

module.exports = Url;