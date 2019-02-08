"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BrokenLinksService = _interopRequireDefault(require("../Service/BrokenLinksService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BrokenLinksController {
  constructor(args) {
    this.args = args;
    this.logger = new (require('../Utility/Logger'))(args);
  }
  /**
   * @Todo: Finished but did not exit.
   * @returns {Promise}
   */


  start() {
    return new Promise((resolve, reject) => {
      this.args.output.doesFolderExist();
      let brokenLinksService = new _BrokenLinksService.default(this.args);
      brokenLinksService.on('start', progress => {
        this.logger.report(progress.toLog());

        if (this.args.verbose) {
          console.log(progress.toString());
        }
      }).on('progress', progress => {
        this.logger.report(progress.toLog());

        if (this.args.verbose) {
          console.log(progress.toString());
        }
      }).on('complete', progress => {
        this.logger.report(progress.toLog());
        console.log(progress.toString());
      });
      brokenLinksService.start().then(() => resolve()).catch(e => reject(e));
    });
  }

}

exports.default = BrokenLinksController;
//# sourceMappingURL=BrokenLinksController.js.map