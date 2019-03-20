"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _got = _interopRequireDefault(require("got"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function isLinkWorking(link, options) {
  options = Object.assign({
    checkConnectivity: false,
    followRedirect: true,
    timeout: 15000,
    retries: 0,
    agent: null
  }, options);
  const gotOptions = {
    timeout: options.timeout,
    followRedirect: options.followRedirect,
    retries: options.retries,
    throwHttpErrors: true,
    agent: options.agent,
    headers: {
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36'
    }
  };

  try {
    await (0, _got.default)(link, gotOptions);
    return true;
  } catch (error) {
    return false;
  }
}

var _default = isLinkWorking;
exports.default = _default;
//# sourceMappingURL=IsLinkWorking.js.map