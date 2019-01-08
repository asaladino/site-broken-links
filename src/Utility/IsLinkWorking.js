const got = require('got');

async function isLinkWorking(link, options) {
    options = Object.assign({
        checkConnectivity: false,
        followRedirect: true,
        timeout: 15000,
        retries: 0,
        agent: null,
    }, options);

    const gotOptions = {
        timeout: options.timeout,
        followRedirect: options.followRedirect,
        retries: options.retries,
        throwHttpErrors: true,
        agent: options.agent,
        headers: {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
        },
    };

    try {
        await got(link, gotOptions);
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = isLinkWorking;