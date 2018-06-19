const UrlsRepository = require('../Repository/UrlsRepository');
const HtmlRepository = require('../Repository/HtmlRepository');
const Progress = require('../Model/Progress');
const Url = require('../Model/Url');
const Link = require('../Model/Link');
const LinkChecked = require('../Model/LinkChecked');
const isLinkWorking = require('../Utility/IsLinkWorking');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const BrokenLinksRepository = require('../Repository/BrokenLinksRepository');
const fs = require('fs');
const path = require("path");

class BrokenLinksService {

    constructor(args) {
        this.args = args;
        this.events = new Map();
    }

    async start() {
        // Load the urls to test.
        let urlsRepository = new UrlsRepository(this.args);
        let brokenLinksRepository = new BrokenLinksRepository(this.args);
        let htmlRepository = new HtmlRepository(this.args.getProjectPath());

        let urls;
        if (this.args.rescan) {
            urls = urlsRepository.findAll();
        } else {
            urls = urlsRepository.findAll().filter(url => {
                return !fs.existsSync(path.join(brokenLinksRepository.folder, url.name + '.json'));
            });
        }

        let progress = new Progress(null, urls.length);

        this.linksChecked = [];

        this.emitStart(progress);
        for (let url of urls) {
            const file = htmlRepository.file(url);
            const dom = await JSDOM.fromFile(file, { url: url.url, includeNodeLocations: true });
            const links = dom.window.document.querySelectorAll("a");
            for (let element of links) {
                let link = new Link(element.title || element.innerHTML, element.href, BrokenLinksService.getSelector(element), 'a', this.args.baseUrl, dom.nodeLocation(element));
                await this.addCheckedLink(link, url);
                if (link.isUrlValid()) {
                    progress.checked(new Url(link));
                    this.emitProgress(progress);
                }
            }
            const images = dom.window.document.querySelectorAll("img");
            for (let element of images) {
                let link = new Link(element.alt, element.src, BrokenLinksService.getSelector(element), 'img', this.args.baseUrl, dom.nodeLocation(element));
                await this.addCheckedLink(link, url);
                if (link.isUrlValid()) {
                    progress.checked(new Url(link));
                    this.emitProgress(progress);
                }
            }
            brokenLinksRepository.save(url);
            progress.update(url);
            this.emitProgress(progress);
        }

        this.emitComplete(progress);
    }

    findLinkChecked(link) {
        return this.linksChecked.find(lc => lc.url === link.url);
    }

    async addCheckedLink(link, url) {
        if (link.isUrlValid()) {
            let linkedChecked = this.findLinkChecked(link);
            if (linkedChecked) {
                link.working = linkedChecked.working;
                url.addLinks(link);
            } else {
                try {
                    link.working = await isLinkWorking(link.absoluteUrl());
                } catch (e) {
                    console.log(e);
                }
                url.addLinks(link);
                this.linksChecked.push(new LinkChecked(link));
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
        let i = null;
        // Query parts collection
        const s = [];
        // Current element's tag name
        let t = null;
        // Iterate through the element's ancestors
        while (el.parentNode) {
            // If element has ID, we're done -
            // build selector from all previous parts
            if (el.id) {
                s.unshift('#' + el.id);
                break;
            } else {
                // Reached the body or html tag -
                // add the tag to the parts collection
                if (el === el.ownerDocument.documentElement ||
                    el === el.ownerDocument.body) {
                    s.unshift(el.tagName.toLowerCase());
                    // Get the element's position amongst its
                    // siblings to build an "nth-child" selector
                } else {
                    // Grab tagName before iterating through
                    // siblings in case there is mixed ancestry
                    t = el.tagName.toLowerCase();
                    for (i = 1; el.previousElementSibling; i++) {
                        el = el.previousElementSibling;
                    }
                    s.unshift(t + ':nth-child(' + i + ')');
                }
                // Repeat for parent
                el = el.parentNode;
            }
        }
        // Return all parts, joined
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

module.exports = BrokenLinksService;