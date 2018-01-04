const ProgressBar = require('ascii-progress');

class ProgressUtility {
    static build(count) {
        return new ProgressBar({
            schema: ' .white:filled.red:blank.grey .white :current/:total :percent ' +
            '\n elapsed: :elapseds | eta: :etas ' +
            '\n :message',
            total: count
        });
    }
}

module.exports = ProgressUtility;