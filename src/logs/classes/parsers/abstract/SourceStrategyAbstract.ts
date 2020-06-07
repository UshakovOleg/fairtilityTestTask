// All source strategies should extend this class
export abstract class SourceStrategyAbstract {
    /**
     * options object which is different for each strategy
     */
    protected abstract options: object;

    /**
     * function to get data from data source
     */
    public abstract getData(): Promise<string>; // TODO: sync, generator.

    /**
     * function to change strategy options
     * @param options
     */
    public abstract setOptions(options: object): SourceStrategyAbstract
}
