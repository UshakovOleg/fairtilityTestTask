export interface ISpacesFieldsOptions {
    delimiter: string; // symbol which separates two values, e.g. Space
    fullOptionMarkerChar: string; // symbol which is used for values with value separators, e.g. ", "test value"
    fieldsCommentTitle: string; // comment title to determine the comment line with fields, e.g Fields:
    fieldsCommentChar: string; // comment char - , e.g. #
    fieldsCommentDelimiter: string; // comment delimiter char. similar to delimiter, but for fields.
}