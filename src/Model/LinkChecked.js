// @flow
import Link from "./Link";

/**
 * Url found on the site.
 */
export default class LinkChecked {
    /**
     * Full url found on the site.
     */
    url: string;
    /**
     * Is the link working?
     */
    working: boolean;

    constructor(link: Link) {
        this.url = link.url;
        this.working = link.working;
    }
}
