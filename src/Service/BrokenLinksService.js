const {HtmlUrlChecker} = require('broken-link-checker');
const UrlsRepository = require('../Repository/UrlsRepository');

const BrokenLinksRepository = require('../Repository/BrokenLinksRepository');
const fs = require('fs');
const path = require("path");

class BrokenLinksService {

    constructor(args) {
        this.args = args;
        this.events = new Map();
    }

    start() {
        // Load the urls to test.
        let urlsRepository = new UrlsRepository(this.args);
        let brokenLinksRepository = new BrokenLinksRepository(this.args);
        let urls = urlsRepository.findAll().filter(url => {
            return !fs.existsSync(path.join(brokenLinksRepository.folder, url.name + '.json'));
        });

        this.emitStart(urls);
        const htmlUrlChecker = new HtmlUrlChecker({})
            .on('link', (result, /** @type {Url} */url) => {
                if (result.broken) {
                    url.addBroken(result);
                }
                this.emitProgress('current: ' + url.name + '\n checking: ' + this.shortenUrl(result.url.original), 0);
            })
            .on('page', (error, pageUrl, url) => {
                brokenLinksRepository.save(url);
                this.emitProgress('next page: ' + this.shortenUrl(pageUrl), 1);
            })
            .on('error', (error) => {})
            .on('end', () => {
                this.emitProgress('saving...', 0);
                this.emitComplete();
            });
        urls.forEach(url => htmlUrlChecker.enqueue(url.url, url));
        if (urls.length === 0) {
            this.emitComplete();
        }
    }

    /**
     * Shorten a url if it is too long.
     * @param {string} url to shorten
     * @return {string} new short url.
     */
    shortenUrl(url) {
        if (url.length > 20) {
            return '...' + url.substring(url.length - 20, url.length);
        }
        return url;
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
     * @param urls {[Url]} found at start.
     */
    emitStart(urls) {
        this.events.forEach((callback, event) => {
            if (event === 'start') {
                callback(urls);
            }
        });
    }

    /**
     * Emits that progress event.
     * @param url {string} that is currently having its content extracted from.
     * @param tick should the progress bar move? 0 for no.
     */
    emitProgress(url, tick) {
        this.events.forEach((callback, event) => {
            if (event === 'progress') {
                callback(url, tick);
            }
        });
    }

    /**
     * Emits that complete event when service has finished.
     */
    emitComplete() {
        this.events.forEach((callback, event) => {
            if (event === 'complete') {
                callback();
            }
        });
    }
}

module.exports = BrokenLinksService;