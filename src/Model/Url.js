// @flow
import Link from "./Link";

/**
 * Url found on the site.
 */
export default class Url {
    /**
     * Kind of like a id for file names and look up.
     */
    name: string;
    /**
     * Full url found on the site.
     */
    url: string;
    /**
     * A list of links found on the page that are broken.
     */
    links: Link[];
    constructor(entry: any) {
        Object.assign(this, entry);
        this.links = [];
    }

    /**
     * Add a link for the page.
     * @param link {Link} that is broken.
     */
    addLink(link: Link) {
        this.links.push(link);
    }

    /**
     * Clear all links.
     */
    clearLinks() {
        this.links =[];
    }
}