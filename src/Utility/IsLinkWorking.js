'use strict';

const WritableStream = require('stream').Writable;
const got = require('got');

class DevNull extends WritableStream {
    _write(chunk, encoding, callback) {
        callback();
    }
}

function tryHead(link, gotOptions) {
    return got.head(link, gotOptions)
        .then(() => true);
}

function tryGet(link, options, gotOptions) {
    return new Promise((resolve, reject) => {
        let stream;
        let req;

        try {
            stream = got.stream(link, gotOptions);
        } catch (err) {
            return resolve(false);
        }

        stream
            .on('request', (req_) => {
                req = req_;
            })
            .on('response', (res) => {
                res.on('error', () => {
                });  // Swallow any response errors, because we are going to abort the request
                if (req) {
                    setImmediate(() => req.abort());
                }
                resolve(true);
            })
            .on('error', (err, body, res) => {
                return resolve(false);
            })
            .pipe(new DevNull());
    });
}

// -------------------------------------------------------------------------

function isLinkWorking(link, options) {
    options = Object.assign({
        checkConnectivity: false,
        followRedirect: true,
        timeout: 15000,
        retries: 3,
        agent: null,
    }, options);

    const gotOptions = {
        timeout: options.timeout,
        followRedirect: options.followRedirect,
        retries: options.retries,
        agent: options.agent,
        headers: {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
        },
    };

    return tryHead(link, gotOptions)
        .catch(() => tryGet(link, options, gotOptions));
}

module.exports = isLinkWorking;
module.exports.connectivityCacheDuration = 5000;
