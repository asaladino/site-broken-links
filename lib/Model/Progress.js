"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Url = _interopRequireDefault(require("./Url"));

var _Link = _interopRequireDefault(require("./Link"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Class for reporting the progress.
 */
class Progress {
  /**
   * Build a progress object.
   */
  constructor(url, total) {
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
    let url = this.url == null ? '' : this.url.url;
    return `${this.total} | ${this.progress} :: tested - ${this.working ? 'working' : 'broken'} - ${url}`;
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
      url: this.url == null ? '' : this.url.url
    };
  }
  /**
   * Update the progress.
   * @param url {Url} that was just processed.
   */


  update(url) {
    this.url = new _Url.default(_objectSpread({}, url));
    this.progress++;
  }
  /**
   * Just updating the url.
   * @param link {Link} that was checked.
   */


  checked(link) {
    this.url = new _Url.default({
      name: link.title,
      url: link.url
    });
    this.working = link.working;
  }

}

exports.default = Progress;
//# sourceMappingURL=Progress.js.map