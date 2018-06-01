const winston = require('winston');
const Args = require('../Model/Args');
const path = require("path");
const fs = require("fs");

class Logger {

    /**
     * @param {Args} args
     */
    constructor(args) {
        this.args = args;
        this.logsPath = this.getLogsPath();
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            transports: [
                new winston.transports.File({filename: path.join(this.logsPath, 'last_run.log')})
            ]
        });
    }

    save(state) {
        return new Promise((resolve) => {
            let file = path.join(this.logsPath, 'state.json');
            fs.writeFileSync(file, JSON.stringify(state));
            resolve();
        });
    }

    info(state) {
        this.logger.log('info', JSON.stringify(state));
    }

    report(state) {
        this.save(state);
        this.info(state);
    }

    getLogsPath() {
        let logsPathBase = path.join(this.args.getProjectPath(), 'logs');
        if (!fs.existsSync(logsPathBase)) {
            fs.mkdirSync(logsPathBase);
        }

        let logsPath = path.join(this.args.getProjectPath(), 'logs', 'broken_links');
        if (!fs.existsSync(logsPath)) {
            fs.mkdirSync(logsPath);
        }
        return logsPath;
    }

}

module.exports = Logger;