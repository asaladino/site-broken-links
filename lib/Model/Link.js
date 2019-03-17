"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Url found on the site.
 */
class Link {
  /**
   * Kind of like a id for file names and look up.
   */

  /**
   * Full url found on the site.
   */

  /**
   * What type of element are we checking?
   */

  /**
   * Selector to find the url
   * @type {string}
   */

  /**
   * Is the link working?
   */

  /**
   * Node location information
   */
  constructor(title, url, selector, type, nodeLocation) {
    this.title = title;
    this.url = url;
    this.type = type;
    this.selector = selector;
    this.working = false;
    this.nodeLocation = nodeLocation;
  }

  isUrlValid() {
    return this.url.startsWith("https://") || this.url.startsWith("http://");
  }

}

exports.default = Link;
//# sourceMappingURL=Link.js.map