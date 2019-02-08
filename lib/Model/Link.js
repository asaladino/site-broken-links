"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Url found on the site.
 */
class Link {
  constructor(title, url, selector, type, nodeLocation) {
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
    /**
     * Node location information
     * @type {object}
     */

    this.nodeLocation = nodeLocation;
  }

  isUrlValid() {
    return this.url.startsWith("https://") || this.url.startsWith("http://");
  }

}

exports.default = Link;
//# sourceMappingURL=Link.js.map