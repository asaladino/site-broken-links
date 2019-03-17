"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _Url = _interopRequireDefault(require("../Model/Url"));

var _Args = _interopRequireDefault(require("../Model/Args"));

var _path = require("path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Retrieve all the urls for the domain.
 */
class UrlsRepository {
  /**
   * Args passed from the commandline.
   */

  /**
   * Build the url repo.
   * @param args {Args} passed from the commandline.
   */
  constructor(args) {
    this.args = args;
  }
  /**
   * Find all urls.
   */


  findAll() {
    let urlsFile = (0, _path.join)(this.args.output.filename, this.args.getSiteName(), 'urls', 'urls.json');
    return JSON.parse((0, _fs.readFileSync)(urlsFile).toString()).map(entry => new _Url.default(entry));
  }

}

exports.default = UrlsRepository;
//# sourceMappingURL=UrlsRepository.js.map