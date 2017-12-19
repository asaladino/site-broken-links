const fs = require('fs');
const path = require("path");

const Option = require('../Model/Option');
const Args = require('../Model/Args');

class OptionsRepository {

    /**
     * @param {Args} args
     */
    constructor(args) {
        this.args = args;
    }

    /**
     * @returns {Option}
     */
    getOption() {
        if (!this.option) {
            let optionsFile = path.join(this.args.output.filename, 'options', this.args.getSiteName() + '.json');
            this.option = new Option(JSON.parse(fs.readFileSync(optionsFile).toString()));
        }
        return this.option;
    }

}

module.exports = OptionsRepository;