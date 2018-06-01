const fs = require('fs');
const Url = require('../Model/Url');
const path = require("path");

/**
 * Save the url html to file.
 */
class HtmlRepository {

    /**
     * Build a json url repo.
     * @param projectFolder {string}
     */
    constructor(projectFolder) {
        /**
         * Location to the html folder in the project.
         * @type {string}
         */
        this.projectFolder = projectFolder;
    }

    /**
     * Gets the full path to the html file.
     * @param url {Url}
     * @returns {string}
     */
    file(url) {
        return path.join(this.getProjectsHtmlFolder(), url.name + '.html');
    }

    /**
     * Creates the html folder in the project if it doesn't exist.
     * @returns {string} for the html folder.
     */
    getProjectsHtmlFolder() {
        let projectsPathHtml = path.join(this.projectFolder, 'html');
        if (!fs.existsSync(projectsPathHtml)) {
            fs.mkdirSync(projectsPathHtml);
        }
        return projectsPathHtml;
    }
}

module.exports = HtmlRepository;