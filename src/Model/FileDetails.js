// @flow
import {existsSync} from "fs";

/**
 * Convenience class for checking if a file exists.
 */
export default class FileDetails {
    /**
     * File name to get details for.
     */
    filename: string;

    constructor(filename: string) {
        this.filename = filename;
    }

    /**
     * If the file does not exist, throw an exception.
     * @throws file not found exception.
     */
    doesFolderExist() {
        if (!existsSync(this.filename)) {
            throw "Output folder not found:" + this.filename;
        }
    }
}
