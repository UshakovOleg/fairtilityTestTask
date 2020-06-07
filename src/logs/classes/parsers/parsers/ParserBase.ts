import {SourceStrategyAbstract} from "../abstract/SourceStrategyAbstract";
import {ParseStrategyAbstract} from "../abstract/ParseStrategyAbstract";

/**
 * Base class for parser.
 */
export class ParserBase {
    protected sourceStrategy: SourceStrategyAbstract;
    protected parseStrategy: ParseStrategyAbstract;

    /**
     * @param sourceStrategy - a strategy to get data from data source
     * @param parseStrategy - parse data strategy
     */
    constructor(sourceStrategy: SourceStrategyAbstract, parseStrategy: ParseStrategyAbstract) {
        this.parseStrategy = parseStrategy;
        this.sourceStrategy = sourceStrategy;
    };


    // TODO: sync / event emitter strategy handle
    // TODO: EventEmitter - for reading file line by line an parsing line by line
    public async parse<T>(): Promise<T> {
        const dataToParse: string = await this.sourceStrategy.getData();
        return await this.parseStrategy.parse(dataToParse);
    }

}