import BrokenLinksService from '../Service/BrokenLinksService';
import Logger from '../Utility/Logger';

export default class BrokenLinksController {

    constructor(args) {
        this.args = args;
        this.logger = new Logger(args);
    }

    /**
     * @Todo: Finished but did not exit.
     * @returns {Promise}
     */
    start() {
        return new Promise((resolve, reject) => {
            this.args.output.doesFolderExist();
            let brokenLinksService = new BrokenLinksService(this.args);
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
            brokenLinksService.start()
                .then(() => resolve())
                .catch(e => reject(e));
        });
    }
}
