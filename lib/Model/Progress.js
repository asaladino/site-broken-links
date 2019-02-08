"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Url = _interopRequireDefault(require("./Url"));

var _Link = _interopRequireDefault(require("./Link"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Class for reporting the progress.
 */
class Progress {
  /**
   * Build a progress object.
   * @param url {Url|null} current url
   * @param total {number} total urls to process.
   */
  constructor() {
    let url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    let total = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
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
    return this.total + " | " + this.progress + " :: tested - " + (this.working ? "working" : "broken ") + " - " + (this.url === null ? null : this.url.url);
  }
  /**
   * Something to report in the logs.
   * @return {{urlsPoolLength: number, urlsLength: number, url: string}}
   */


  toLog() {
    return {
      total: this.total,
      progress: this.progress,
      working: this.working,
      url: this.url === null ? null : this.url.url
    };
  }
  /**
   * Update the progress.
   * @param url {Url} that was just processed.
   */


  update(url) {
    this.url = {
      name: url.name,
      url: url.url
    };
    this.progress++;
  }
  /**
   * Just updating the url.
   * @param link {Link} that was checked.
   */


  checked(link) {
    this.url = {
      name: link.title,
      url: link.url
    };
    this.working = link.working;
  }

}

exports.default = Progress;
//# sourceMappingURL=Progress.js.map