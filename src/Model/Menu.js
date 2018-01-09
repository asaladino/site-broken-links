const FileDetails = require('./FileDetails');

/**
 * Available options for the site index.
 * @type {*[]}
 */
module.exports = [
    {
        header: 'Site Broken Links',
        content: 'Check a site for broken links.'
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'domain',
                type: String,
                typeLabel: '[underline]{www.domain.com}',
                description: '(Required) Domain to run broken links reports on.'
            },
            {
                name: 'output',
                type: filename => new FileDetails(filename),
                typeLabel: '[underline]{file}',
                description: '(Required) Folder to output the reports to.'
            },
            {
                name: 'verbose',
                defaultValue: false,
                type: Boolean,
                description: 'Output information on the reporting.'
            },
            {
                name: 'help',
                type: Boolean,
                description: 'Print this usage guide.'
            }
        ]
    }
];