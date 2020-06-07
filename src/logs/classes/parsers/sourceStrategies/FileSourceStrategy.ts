import {SourceStrategyAbstract} from "../abstract/SourceStrategyAbstract";
import {IFileSourceOptions} from "../parsers/IFileSourceOptions";
import * as readline from 'readline';
import * as fs from 'fs';
import * as os from "os";

// a strategy to get data from file line by line
export default class FileSourceStrategy extends SourceStrategyAbstract {
    protected options: IFileSourceOptions;

    constructor(options: IFileSourceOptions) {
        super();
        if (!options) {
            throw new TypeError('No enough parameters. File path not defined');
        }
        this.options = options;
    }

    /**
     * retrieves data from file line by line
     * @returns {Promise<string>}
     */
    public async getData (): Promise<string> {
        // TODO: MAKE IT GENERATOR FUNCTION OR EventEmitter based if file size expected to be bigger
        let res: string = '';
        let lines = 0;
        const rl = readline.createInterface({
            input: fs.createReadStream(this.options.filePath),
            crlfDelay: Infinity
        });

        for await (const line of rl) {
            res += line + os.EOL;
            ++lines;
        }
        return res;
    }


    /**
     * used for changing strategy options in runtime
     * @param options
     * @returns {FileSourceStrategy}
     */
    public setOptions(options: IFileSourceOptions): FileSourceStrategy {
        this.options = options;
        return this;
    }

}