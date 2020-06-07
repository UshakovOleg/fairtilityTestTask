// All parse strategies should extend this class
export abstract class ParseStrategyAbstract {
    /**
     * options object which is different for each strategy
     */
    protected options: object;

    /**
     * function that parses data got from data strategy
     * @param toParseData
     */
    public abstract parse(toParseData: string);
}
