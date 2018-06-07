/**
 * Url found on the site.
 */
class Link {
    constructor(title, url, selector, type, baseUrl) {
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
         * Base url of the site.
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
        this.isRealitiveUrl = this.isRealitiveUrl.bind(this);
    }

    isUrlValid() {
        return this.url.startsWith('https://') || this.url.startsWith('http://') || this.isRealitiveUrl();
    }

    isRealitiveUrl() {
        return this.url.startsWith('/');
    }

    absoluteUrl() {
        return this.isRealitiveUrl() ? `${this.baseUrl}${this.url}` : this.url;
    }

}

module.exports = Link;