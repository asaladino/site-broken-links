"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FileDetails = _interopRequireDefault(require("./FileDetails"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getFileDetails = filename => {
  return new _FileDetails.default(filename);
};
/**
 * Available options for the site index.
 */


var _default = [{
  header: 'Site Broken Links',
  content: 'Check a site for broken links.'
}, {
  header: 'Options',
  optionList: [{
    name: 'domain',
    type: String,
    typeLabel: '[underline]{www.domain.com}',
    description: '(Required) Domain to run broken links reports on.'
  }, {
    name: 'output',
    type: getFileDetails,
    typeLabel: '[underline]{file}',
    description: '(Required) Folder to output the reports to.'
  }, {
    name: 'verbose',
    defaultValue: false,
    type: Boolean,
    description: 'Output information on the reporting.'
  }, {
    name: 'help',
    type: Boolean,
    description: 'Print this usage guide.'
  }]
}];
exports.default = _default;
//# sourceMappingURL=Menu.js.map