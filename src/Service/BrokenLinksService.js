const {HtmlUrlChecker} = require('broken-link-checker');
const OptionsRepository = require('../Repository/OptionsRepository');
const UrlsRepository = require('../Repository/UrlsRepository');

const BrokenLinksRepository = require('../Repository/BrokenLinksRepository');

class BrokenLinksService {

    constructor(args) {
        this.args = args;
        this.events = new Map();
        // Load the option.
        let optionsRepository = new OptionsRepository(args);
        this.option = optionsRepository.getOption();
    }

    start() {
        // Load the urls to test.
        let urlsRepository = new UrlsRepository(this.option, this.args);
        let urls = urlsRepository.findForRange();
        let brokenLinksRepository = new BrokenLinksRepository(this.option, this.args);
        this.emitStart(urls);
        const htmlUrlChecker = new HtmlUrlChecker({})
            .on('link', (result, /** @type {Url} */url) => {
                if (result.broken) {
                    url.addBroken(result.url.original);
                }
            }).on('page', (error, pageUrl, url) => {
                this.emitProgress(url);
            }).on('end', () => {
                urls.forEach(url => brokenLinksRepository.save(url));
                this.emitComplete();
            });
        urls.forEach(url => htmlUrlChecker.enqueue(url.url, url));
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
     * @param url {Url} that is currently having its content extracted from.
     */
    emitProgress(url) {
        this.events.forEach((callback, event) => {
            if (event === 'progress') {
                callback(url);
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