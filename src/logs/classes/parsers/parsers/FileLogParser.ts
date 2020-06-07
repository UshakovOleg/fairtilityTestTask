import {ParserBase} from "./ParserBase";
import {SourceStrategyAbstract} from "../abstract/SourceStrategyAbstract";
import {ParseStrategyAbstract} from "../abstract/ParseStrategyAbstract";

/**
 * Class for parsing file logs
 */
export default class FileLogParser extends ParserBase {
    constructor(logSourceStrategy: SourceStrategyAbstract, logParseStrategy: ParseStrategyAbstract) {
        super(logSourceStrategy, logParseStrategy);
    }
}