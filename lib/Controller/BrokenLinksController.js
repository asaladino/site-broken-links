"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BrokenLinksService = _interopRequireDefault(require("../Service/BrokenLinksService"));

var _Logger = _interopRequireDefault(require("../Utility/Logger"));

var _Args = _interopRequireDefault(require("../Model/Args"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// noinspection JSUnusedGlobalSymbols
class BrokenLinksController {
  constructor(args) {
    this.args = args;
    this.logger = new _Logger.default(args);
  }
  /**
   * @todo: Finished but did not exit.
   * @todo: add callback
   * @todo: flow
   * @returns {Promise}
   */


  start() {
    let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (event, progress) => {};
    return new Promise((resolve, reject) => {
      this.args.output.doesFolderExist();
      let brokenLinksService = new _BrokenLinksService.default(this.args);
      brokenLinksService.on('start', progress => {
        callback('start', progress);
        this.logger.report(progress.toLog());

        if (this.args.verbose) {
          console.log(progress.toString());
        }
      }).on('progress', progress => {
        callback('progress', progress);
        this.logger.report(progress.toLog());

        if (this.args.verbose) {
          console.log(progress.toString());
        }
      }).on('complete', progress => {
        callback('complete', progress);

        if (this.args.verbose) {
          console.log('Done');
        }
      });
      brokenLinksService.start().then(() => resolve()).catch(e => reject(e));
    });
  }

}

exports.default = BrokenLinksController;
//# sourceMappingURL=BrokenLinksController.js.map