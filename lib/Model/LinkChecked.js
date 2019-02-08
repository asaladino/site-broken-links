"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Url found on the site.
 */
class LinkChecked {
  constructor(link) {
    /**
     * Full url found on the site.
     * @type {string}
     */
    this.url = link.url;
    /**
     * Is the link working?
     * @type {boolean}
     */

    this.working = link.working;
  }

}

exports.default = LinkChecked;
//# sourceMappingURL=LinkChecked.js.map