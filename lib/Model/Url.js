"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
     * A list of links found on the page that are broken.
     * @type {[Link]}
     */

    this.links = [];
    Object.assign(this, entry);
  }
  /**
   * Add a link for the page.
   * @param link {Link} that is broken.
   */


  addLink(link) {
    this.links.push(link);
  }
  /**
   * Clear all links.
   */


  clearLinks() {
    this.links = [];
  }

}

exports.default = Url;
//# sourceMappingURL=Url.js.map