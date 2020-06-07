import {SourceStrategyAbstract} from "../abstract/SourceStrategyAbstract";
import {ISyncSourceOptions} from "../parsers/IImplicitSourceOptions";

// strategy for working with sync data. used for data we already have, need only to parse it
export default class SyncSourceStrategy extends SourceStrategyAbstract {
    protected options: ISyncSourceOptions;
    constructor(options: ISyncSourceOptions) {
        super();
        if (!options) {
            throw new TypeError('No enough parameters. File path not defined');
        }
        this.options = options;
    }

    public async getData() {
        return Promise.resolve(this.options.toParseData)
    }

    public setOptions(options: ISyncSourceOptions): SyncSourceStrategy {
        this.options = options;
        return this;
    }

}