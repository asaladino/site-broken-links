class Url {
    constructor(name, url, fragment) {
        this.name = name;
        this.url = url;
        this.fragment = fragment;
        this.errorCount = 0;
        this.tested = false;
        this.broken = [];
    }

    addError() {
        this.errorCount++;
    }

    addBroken(url) {
        this.broken.push(url);
    }
}

module.exports = Url;