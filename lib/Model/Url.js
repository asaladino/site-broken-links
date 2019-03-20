"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Link = _interopRequireDefault(require("./Link"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Url found on the site.
 */
class Url {
  /**
   * Kind of like a id for file names and look up.
   */

  /**
   * Full url found on the site.
   */

  /**
   * A list of links found on the page that are broken.
   */
  constructor(entry) {
    Object.assign(this, entry);
    this.links = [];
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