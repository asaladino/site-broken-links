const ProgressUtility = require('../Utility/ProgressUtility');
const BrokenLinksService = require('../Service/BrokenLinksService');

class BrokenLinksController {

    constructor(args) {
        this.args = args;
    }

    start() {
        return new Promise((resolve, reject) => {
            this.args.output.doesFolderExist();
            let brokenLinksService = new BrokenLinksService(this.args);
            let bar;
            brokenLinksService.on('start', urls => {
                if (this.args.verbose) {
                    bar = ProgressUtility.build(urls.length);
                    let initialUrl = 'No urls found';
                    if (urls.length > 0) {
                        initialUrl = urls[0].url;
                    }
                    bar.tick(0, {message: 'starting: ' + initialUrl});
                }
            }).on('progress', (url, tick) => {
                if (this.args.verbose) {
                    bar.tick(tick, {message: url});
                }
            }).on('complete', () => {
                console.log('\nDone');
                resolve();
            });
            brokenLinksService.start();
        });
    }
}

module.exports = BrokenLinksController;