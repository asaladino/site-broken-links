let LinkCheck = require("./Models/LinkCheck");
let blc = require("broken-link-checker");
let fs = require('fs');


let urls = [];

fs.readFile('list.csv', 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
    } else {
        data.split(/\r?\n/)
            .filter(url => url !== '')
            .forEach(function (url) {
                urls.push(new LinkCheck(url));
            });
        urls.forEach(linkCheck => {
            htmlUrlChecker.enqueue(linkCheck.url, linkCheck);
        });
    }
});

// noinspection JSUnusedLocalSymbols
let htmlUrlChecker = new blc.HtmlUrlChecker({}, {
    'link': function (result, customData) {
        if (result.broken) {
            console.log(result.base.original + " => " + result.url.original);
            customData.addBroken(result.url.original);
        }
    },
    'end': function () {
        console.log("=== DONE");
        urls.forEach(linkCheck => {
            linkCheck.broken.forEach(broke => {
                fs.appendFile('broken/' + linkCheck.file, broke + "\n", function (err) {
                    if (err) throw err;
                });
            });
        });
    }
});

