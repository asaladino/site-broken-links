class Option {
    constructor(option) {
        this.a11y = {
            pa11yLogin: {
                startUrl: 0,
                endUrl: -1
            }
        };
        Object.assign(this, option);
    }
}

module.exports = Option;