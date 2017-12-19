const LinkCheckRepository = require("./src/Repository/LinkCheckRepository");
const blc = require("broken-link-checker");

let linkCheckRepository = new LinkCheckRepository('list.csv');

let linkChecks = [];
linkCheckRepository.findAll().then(links => {
    linkChecks = links;
    links.forEach(linkCheck => {
        htmlUrlChecker.enqueue(linkCheck.url, linkCheck);
    });
});

let htmlUrlChecker = new blc.HtmlUrlChecker({}, {
    'link': function (result, customData) {
        if (result.broken) {
            console.log(result.base.original + " => " + result.url.original);
            customData.addBroken(result.url.original);
        }
    },
    'end': function () {
        console.log("Saving");
        linkCheckRepository.write(linkChecks);
    }
});