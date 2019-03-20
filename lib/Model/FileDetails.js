"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

/**
 * Convenience class for checking if a file exists.
 */
class FileDetails {
  /**
   * File name to get details for.
   */
  constructor(filename) {
    this.filename = filename;
  }
  /**
   * If the file does not exist, throw an exception.
   * @throws file not found exception.
   */


  doesFolderExist() {
    if (!(0, _fs.existsSync)(this.filename)) {
      throw "Output folder not found:" + this.filename;
    }
  }

}

exports.default = FileDetails;
//# sourceMappingURL=FileDetails.js.map