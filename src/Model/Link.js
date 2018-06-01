/**
 * Url found on the site.
 */
class Link {
    constructor(title, url, selector, type) {
        /**
         * Kind of like a id for file names and look up.
         * @type {string}
         */
        this.title = title;
        /**
         * Full url found on the site.
         * @type {string}
         */
        this.url = url;
        /**
         * What type of element are we checking?
         * @type {string}
         */
        this.type = type;
        /**
         * Selector to find the url
         * @type {string}
         */
        this.selector = selector;
        /**
         * Is the link working?
         * @type {boolean}
         */
        this.working = false;
    }

    fixUrl(args) {
        if (this.url.startsWith('file://')) {
            this.url = 'http://' + args.domain + this.url.replace('file://', '');
        }
    }

    isUrlValid() {
        return this.url.startsWith('https://') || this.url.startsWith('http://');
    }

}

module.exports = Link;