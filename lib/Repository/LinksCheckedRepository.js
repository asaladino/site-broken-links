"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _betterSqlite = _interopRequireDefault(require("better-sqlite3"));

var _fs = require("fs");

var _Args = _interopRequireDefault(require("../Model/Args"));

var _LinkChecked = _interopRequireDefault(require("../Model/LinkChecked"));

var _path = require("path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LinksCheckedRepository {
  /**
   * Create a broken links repo.
   * @param args {Args} from the commandline.
   */
  constructor(args) {
    /**
     * From the commandline.
     * @type {Args}
     */
    this.args = args;
    /**
     * Folder to save the broken links to.
     * @type {string} full path to the broken links folder in the project.
     */

    this.folder = '';
    this.createBrokenLinksFolder();
    this.db = new _betterSqlite.default(this.databaseFile, {});
    this.insertStatement = this.db.prepare('INSERT INTO links_checked VALUES (?, ?)');
  }
  /**
   * Find a checked link give a link.
   * @param link {Link}
   * @return {LinkChecked}
   */


  find(link) {
    return this.db.prepare('SELECT * FROM links_checked WHERE url=?').get(link.url);
  }
  /**
   * Save the checked link.
   * @param linkChecked {LinkChecked}
   */


  save(linkChecked) {
    this.insertStatement.run([linkChecked.url, linkChecked.working ? 1 : 0]);
  }
  /**
   * Close the database when done.
   */


  close() {
    this.db.close();
  }
  /**
   * Creates a broken links folder in the project folder.
   */


  createBrokenLinksFolder() {
    this.folder = (0, _path.join)(this.args.output.filename, this.args.getSiteName(), 'broken_links');

    if (!(0, _fs.existsSync)(this.folder)) {
      (0, _fs.mkdirSync)(this.folder);
    }

    this.databaseFile = (0, _path.join)(this.folder, 'links_checked.sqlite');

    if (!(0, _fs.existsSync)(this.databaseFile)) {
      let tempDbFile = (0, _path.join)((0, _path.dirname)(__filename), '../Asset/links_checked.sqlite');
      (0, _fs.copyFileSync)(tempDbFile, this.databaseFile);
    }
  }

}

exports.default = LinksCheckedRepository;
//# sourceMappingURL=LinksCheckedRepository.js.map