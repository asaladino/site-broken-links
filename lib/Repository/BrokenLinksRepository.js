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
 * Saves the broken links to file in json format.
 */
class BrokenLinksRepository {
  /**
   * From the commandline.
   */

  /**
   * Folder to save the broken links to.
   */

  /**
   * Create a broken links repo.
   */
  constructor(args) {
    this.args = args;
    this.folder = '';
    this.createBrokenLinksFolder();
  }
  /**
   * Saves any broken link urls to a json file.
   */


  save(url) {
    let file = (0, _path.join)(this.folder, url.name + '.json');
    let json = JSON.stringify(url.links);
    (0, _fs.writeFileSync)(file, json);
  }
  /**
   * Creates a broken links folder in the project folder.
   */


  createBrokenLinksFolder() {
    this.folder = (0, _path.join)(this.args.output.filename, this.args.getSiteName(), 'broken_links');

    if (!(0, _fs.existsSync)(this.folder)) {
      (0, _fs.mkdirSync)(this.folder);
    }
  }

}

exports.default = BrokenLinksRepository;
//# sourceMappingURL=BrokenLinksRepository.js.map