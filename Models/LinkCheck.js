class LinkCheck {

    constructor(url) {
        this.url = url;
        this.file = this.getFilenameFromUrl();
        this.broken = [];
    }

    getFilenameFromUrl() {
        return this.url.replace(/[^a-zA-Z0-9]/g, '_') + 'broken.csv';
    }

    addBroken(url) {
        this.broken.push(url);
    }
}

module.exports = LinkCheck;