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
class LinkChecked {
  /**
   * Full url found on the site.
   */

  /**
   * Is the link working?
   */
  constructor(link) {
    this.url = link.url;
    this.working = link.working;
  }

}

exports.default = LinkChecked;
//# sourceMappingURL=LinkChecked.js.map