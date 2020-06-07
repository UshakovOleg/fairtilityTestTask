import { Injectable } from '@nestjs/common';
import * as path from "path";
import {ConfigService} from "@nestjs/config";
import FileSourceStrategy from "./classes/parsers/sourceStrategies/FileSourceStrategy";
import FileParseStrategy from "./classes/parsers/parseStrategies/FileParseStrategy";
import FileLogParser from "./classes/parsers/parsers/FileLogParser";
import {ISpacesFieldsParsedItem} from "./classes/parsers/parseStrategies/ISpacesFieldsParsed";

@Injectable()
export class LogsService {
    constructor(private configService: ConfigService) {}

    /**
     * get data from file and parses it
     * @param fileName
     * @returns {Promise<ISpacesFieldsParsedItem[]>}
     */
    public async getLogData(fileName): Promise<ISpacesFieldsParsedItem[]> {
        if(!fileName) {
            throw new TypeError('File name undefined. Please specify');
        }
        const sourceStrategy = new FileSourceStrategy({filePath: path.join(this.configService.get<string>('LOGS_PATH', ''), fileName)});
        const parseStrategy = new FileParseStrategy({
            fullOptionMarkerChar: '"',
            delimiter: ' ',
            fieldsCommentChar: '#',
            fieldsCommentTitle: 'Fields: ',
            fieldsCommentDelimiter: ' '
        });
        const fileLogParser = new FileLogParser(
            sourceStrategy,
            parseStrategy
        );
        // TODO: ERROR HANDLING
        return await fileLogParser.parse();
    }
}
