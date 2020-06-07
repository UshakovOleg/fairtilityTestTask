import {ParseStrategyAbstract} from "../abstract/ParseStrategyAbstract";
import {ISpacesFieldsOptions} from "./ISpacesFieldsOptions";
import {ISpacesFieldsParsedItem} from "./ISpacesFieldsParsed";
import * as os from "os";

/**
 * Class to parse logs file
 * Each line contains one event.
 * The line is white space-delimited (a single or more space between one field to the other).
 * Fields that contains space in their value are surrounded by double quotes.
 * The order of the fields are stated at the beginning of the file, in a comment line started with the term #Fields:.
 */
export default class FileParseStrategy extends ParseStrategyAbstract {
    options: ISpacesFieldsOptions;
    constructor(options: ISpacesFieldsOptions) {
        super();
        // TODO: OPTIONS VALUES VALIDATION.
        // TODO: Delimiters should be one symbol length, delimiter should not match fullOptionMarkerChar, etc...
        this.options = options;
    }

    parse(dataToParse: string): Promise<ISpacesFieldsParsedItem[]> {
        return new Promise((resolve, reject) => {
            // split the file by \n
            const splited = dataToParse.split(os.EOL);
            let fields: string[] = [];
            let res = [];
            const fieldsTitle = this.options.fieldsCommentChar + this.options.fieldsCommentTitle;
            // regex to replace double spaces
            const valuesReplaceRegex = new RegExp(`${this.options.delimiter + '{2,}'}`);
            const delim = this.options.delimiter;
            const escaped = `\\${this.options.fullOptionMarkerChar}`;
            // ' +(?=(?:(?:[^"]*"){2})*[^"]*$)' - regex to split values
            const regexVal = `${delim}+(?=(?:(?:[^${escaped}]*${escaped}){2})*[^${escaped}]*$)`;
            const splitRegex: RegExp = new RegExp(regexVal, 'g');
            // regex to replace fullOptionMarkerChar that remains in values
            const replaceRegex: RegExp = new RegExp(`^${this.options.fullOptionMarkerChar}{1}|${this.options.fullOptionMarkerChar}{1}$`, 'g');
            // TODO: PROCESS POOL TO PARSE DATA IN PARALLEL PROCESSES
            // TODO: EventEmitter based parse strategy to parse and return data line-by-line

            // worker function to execute on every event loop cycle
            let parseNeedle = (i, arr) => {
                // helper function to increase loop value i and to resolve promise if no unparsed data left
                const next = () => {
                    if (i + 1 < arr.length) {
                        i+=1;
                        setImmediate(() => parseNeedle(i, arr));
                    } else {
                        resolve(res);
                    }
                };
                let v = arr[i];
                const isComment = v.substr(0, this.options.fieldsCommentChar.length) === this.options.fieldsCommentChar;
                // trying to find the comment line with fields, if found: set variable and continue parsing
                // if not is comment - proceed
                if (isComment) {
                    if(v.indexOf(fieldsTitle) === 0) {
                        fields = v.substring(fieldsTitle.length,).split(this.options.fieldsCommentDelimiter);
                    }
                    next();
                    return;
                }
                // if not is comment: replace double and more spaces with one
                v = v.replace(valuesReplaceRegex, this.options.delimiter);
                if(!v) {
                    next();
                    return;
                }
                // split values by regex
                let val = v.split(splitRegex);
                if (!val.length) {
                    next();
                    return;
                }
                let obj = {};

                // make the resulting field -> value objects
                for(let i = 0; i < fields.length; i++) {
                    let current = val[i] ? val[i] : "";
                    if (current[0] == this.options.fullOptionMarkerChar && current[current.length - 1] === this.options.fullOptionMarkerChar) {
                        current = current.replace(replaceRegex, '');
                    }
                    obj[fields[i]] = current;
                }
                // and add it to whole results dataset
                res.push(obj);
                next();
            };
            parseNeedle(0, splited);
        });




    }
}