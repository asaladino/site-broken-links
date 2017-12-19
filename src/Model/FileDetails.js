const fs = require("fs");

class FileDetails {
    constructor(filename) {
        this.filename = filename;
    }
    doesFolderExist() {
        if (!fs.existsSync(this.filename)) {
            throw 'Output folder not found:' + this.filename;
        }
    }
}

module.exports = FileDetails;