// @flow
import {existsSync, mkdirSync} from 'fs';
import Url from '../Model/Url';
import {join} from "path";

/**
 * Save the url html to file.
 */
export default class HtmlRepository {

    /**
     * Location to the html folder in the project.
     */
    projectFolder: string;

    /**
     * Build a json url repo.
     */
    constructor(projectFolder: string) {
        this.projectFolder = projectFolder;
    }

    /**
     * Gets the full path to the html file.
     */
    file(url: Url): string {
        return join(this.getProjectsHtmlFolder(), url.name + '.html');
    }

    /**
     * Creates the html folder in the project if it doesn't exist.
     */
    getProjectsHtmlFolder(): string {
        let projectsPathHtml = join(this.projectFolder, 'html');
        if (!existsSync(projectsPathHtml)) {
            mkdirSync(projectsPathHtml);
        }
        return projectsPathHtml;
    }
}
