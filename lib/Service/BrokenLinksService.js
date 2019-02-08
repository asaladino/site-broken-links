"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UrlsRepository = _interopRequireDefault(require("../Repository/UrlsRepository"));

var _HtmlRepository = _interopRequireDefault(require("../Repository/HtmlRepository"));

var _Progress = _interopRequireDefault(require("../Model/Progress"));

var _Url = _interopRequireDefault(require("../Model/Url"));

var _Link = _interopRequireDefault(require("../Model/Link"));

var _LinkChecked = _interopRequireDefault(require("../Model/LinkChecked"));

var _IsLinkWorking = _interopRequireDefault(require("../Utility/IsLinkWorking"));

var _jsdom = _interopRequireDefault(require("jsdom"));

var _BrokenLinksRepository = _interopRequireDefault(require("../Repository/BrokenLinksRepository"));

var _LinksCheckedRepository = _interopRequireDefault(require("../Repository/LinksCheckedRepository"));

var _fs = require("fs");

var _path = require("path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const JSDOM = _jsdom.default.JSDOM;

class BrokenLinksService {
  constructor(args) {
    this.args = args;
    this.events = new Map();
  }

  async start() {
    // Load the urls to test.
    let urlsRepository = new _UrlsRepository.default(this.args);
    let brokenLinksRepository = new _BrokenLinksRepository.default(this.args);
    let htmlRepository = new _HtmlRepository.default(this.args.getProjectPath());
    this.linksCheckedRepository = new _LinksCheckedRepository.default(this.args);
    this.emitComplete(new _Progress.default(null, 0));
    let urls = urlsRepository.findAll().filter(url => {
      return !(0, _fs.existsSync)((0, _path.join)(brokenLinksRepository.folder, url.name + '.json'));
    });
    let progress = new _Progress.default(null, urls.length);
    this.emitStart(progress);

    for (let url of urls) {
      const file = htmlRepository.file(url);
      const dom = await JSDOM.fromFile(file, {
        url: url.url,
        includeNodeLocations: true
      });
      const links = dom.window.document.querySelectorAll("a");

      for (let element of links) {
        let link = new _Link.default(element.title || element.innerHTML, element.href, BrokenLinksService.getSelector(element), 'a', dom.nodeLocation(element));
        await this.addCheckedLink(link, url);

        if (link.isUrlValid()) {
          progress.checked(link);
          this.emitProgress(progress);
        }
      }

      const images = dom.window.document.querySelectorAll("img");

      for (let element of images) {
        let link = new _Link.default(element.alt, element.src, BrokenLinksService.getSelector(element), 'img', dom.nodeLocation(element));
        await this.addCheckedLink(link, url);

        if (link.isUrlValid()) {
          progress.checked(link);
          this.emitProgress(progress);
        }
      }

      brokenLinksRepository.save(url);
      url.clearLinks();
      progress.update(url);
      this.emitProgress(progress);
    }

    this.linksCheckedRepository.close();
    this.emitComplete(progress);
  }

  async addCheckedLink(link, url) {
    if (link.isUrlValid()) {
      let linkedChecked = this.linksCheckedRepository.find(link);

      if (linkedChecked) {
        link.working = linkedChecked.working;
        url.addLink(link);
      } else {
        try {
          link.working = await (0, _IsLinkWorking.default)(link.url);
        } catch (e) {
          console.log(e);
        }

        url.addLink(link);
        this.linksCheckedRepository.save(new _LinkChecked.default(link));
      }
    }
  }
  /**
   * @module getSelector
   * @description Generates a unique CSS selector that will match only the passed element.
   *
   * @param {Element} el - target element
   * @return {(string|boolean)} CSS selector that will return only the passed element, false if element is not valid
   */


  static getSelector(el) {
    // Iterator for nth-child loop
    let i = null; // Query parts collection

    const s = []; // Current element's tag name

    let t = null; // Iterate through the element's ancestors

    while (el.parentNode) {
      // If element has ID, we're done -
      // build selector from all previous parts
      if (el.id) {
        s.unshift('#' + el.id);
        break;
      } else {
        // Reached the body or html tag -
        // add the tag to the parts collection
        if (el === el.ownerDocument.documentElement || el === el.ownerDocument.body) {
          s.unshift(el.tagName.toLowerCase()); // Get the element's position amongst its
          // siblings to build an "nth-child" selector
        } else {
          // Grab tagName before iterating through
          // siblings in case there is mixed ancestry
          t = el.tagName.toLowerCase();

          for (i = 1; el.previousElementSibling; i++) {
            el = el.previousElementSibling;
          }

          s.unshift(t + ':nth-child(' + i + ')');
        } // Repeat for parent


        el = el.parentNode;
      }
    } // Return all parts, joined


    return s.join(' > ');
  }
  /**
   * Receive event information.
   * @param event {string} name of the event. (start, progress, and complete)
   * @param callback {Function} called when the event is emitted.
   * @returns {BrokenLinksService} for chaining.
   */


  on(event, callback) {
    this.events.set(event, callback);
    return this;
  }
  /**
   * Emits that start event.
   * @param progress {Progress} found at start.
   */


  emitStart(progress) {
    this.events.forEach((callback, event) => {
      if (event === 'start') {
        callback(progress);
      }
    });
  }
  /**
   * Emits that progress event.
   * @param progress {Progress} that is currently having its content extracted from.
   */


  emitProgress(progress) {
    this.events.forEach((callback, event) => {
      if (event === 'progress') {
        callback(progress);
      }
    });
  }
  /**
   * Emits that complete event when service has finished.
   * @param progress {Progress} that is currently having its content extracted from.
   */


  emitComplete(progress) {
    this.events.forEach((callback, event) => {
      if (event === 'complete') {
        callback(progress);
      }
    });
  }

}

var _default = BrokenLinksService;
exports.default = _default;
//# sourceMappingURL=BrokenLinksService.js.map