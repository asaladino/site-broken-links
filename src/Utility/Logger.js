// @flow
import { createLogger, format as _format, transports as _transports } from 'winston';
import Args from '../Model/Args';
import { join } from "path";
import { writeFileSync, existsSync, mkdirSync } from "fs";

class Logger {
    args: Args;
    logsPath: string;
    logger: any;

    constructor(args: Args) {
        this.args = args;
        this.logsPath = this.getLogsPath();
        this.logger = createLogger({
            level: 'info',
            format: _format.json(),
            transports: [
                new _transports.File({filename: join(this.logsPath, 'last_run.log')})
            ]
        });
    }

    save(state: any): Promise<any> {
        return new Promise((resolve) => {
            let file = join(this.logsPath, 'state.json');
            writeFileSync(file, JSON.stringify(state));
            resolve();
        });
    }

    info(state: any) {
        this.logger.log('info', JSON.stringify(state));
    }

    report(state: any) {
        this.save(state);
        this.info(state);
    }

    getLogsPath() {
        let logsPathBase = join(this.args.getProjectPath(), 'logs');
        if (!existsSync(logsPathBase)) {
            mkdirSync(logsPathBase);
        }

        let logsPath = join(this.args.getProjectPath(), 'logs', 'broken_links');
        if (!existsSync(logsPath)) {
            mkdirSync(logsPath);
        }
        return logsPath;
    }

}

export default Logger;