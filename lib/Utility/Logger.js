"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _winston = require("winston");

var _Args = _interopRequireDefault(require("../Model/Args"));

var _path = require("path");

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Logger {
  constructor(args) {
    this.args = args;
    this.logsPath = this.getLogsPath();
    this.logger = (0, _winston.createLogger)({
      level: 'info',
      format: _winston.format.json(),
      transports: [new _winston.transports.File({
        filename: (0, _path.join)(this.logsPath, 'last_run.log')
      })]
    });
  }

  save(state) {
    return new Promise(resolve => {
      let file = (0, _path.join)(this.logsPath, 'state.json');
      (0, _fs.writeFileSync)(file, JSON.stringify(state));
      resolve();
    });
  }

  info(state) {
    this.logger.log('info', JSON.stringify(state));
  }

  report(state) {
    this.save(state);
    this.info(state);
  }

  getLogsPath() {
    let logsPathBase = (0, _path.join)(this.args.getProjectPath(), 'logs');

    if (!(0, _fs.existsSync)(logsPathBase)) {
      (0, _fs.mkdirSync)(logsPathBase);
    }

    let logsPath = (0, _path.join)(this.args.getProjectPath(), 'logs', 'broken_links');

    if (!(0, _fs.existsSync)(logsPath)) {
      (0, _fs.mkdirSync)(logsPath);
    }

    return logsPath;
  }

}

var _default = Logger;
exports.default = _default;
//# sourceMappingURL=Logger.js.map