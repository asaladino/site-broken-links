// @flow
/**
 * Url found on the site.
 */
export default class Link {
    /**
     * Kind of like a id for file names and look up.
     */
    title: string;
    /**
     * Full url found on the site.
     */
    url: string;
    /**
     * What type of element are we checking?
     */
    type: string;
    /**
     * Selector to find the url
     * @type {string}
     */
    selector: string;
    /**
     * Is the link working?
     */
    working: boolean;
    /**
     * Node location information
     */
    nodeLocation: any;

    constructor(title: string, url: string, selector: string, type: string, nodeLocation: any) {
        this.title = title;
        this.url = url;
        this.type = type;
        this.selector = selector;
        this.working = false;
        this.nodeLocation = nodeLocation;
    }

    isUrlValid(): boolean {
        return this.url.startsWith("https://") || this.url.startsWith("http://");
    }
}
