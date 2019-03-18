// @flow

import BrokenLinksService from '../Service/BrokenLinksService';
import Logger from '../Utility/Logger';
import Args from "../Model/Args";

// noinspection JSUnusedGlobalSymbols
export default class BrokenLinksController {
    args: Args;
    logger: Logger;

    constructor(args: Args) {
        this.args = args;
        this.logger = new Logger(args);
    }

    /**
     * @todo: Finished but did not exit.
     * @todo: add callback
     * @todo: flow
     * @returns {Promise}
     */
    start(callback: function = (event, progress) => {}): Promise<void> {
        return new Promise((resolve, reject) => {
            this.args.output.doesFolderExist();
            let brokenLinksService = new BrokenLinksService(this.args);
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
            brokenLinksService.start()
                .then(() => resolve())
                .catch(e => reject(e));
        });
    }
}
