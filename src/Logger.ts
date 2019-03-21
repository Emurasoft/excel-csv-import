interface Record {
    readonly name: string;
    readonly args: {};
}

export class Logger {
    public constructor() {
        this._log = [];
    }

    // Adds name and a deep copy of args if defined otherwise empty object, as a new record.
    // Do not add sensitive information.
    public push(name: string, args?: {[key: string]: any}): void {
        this._log.push(Object.freeze({name, args: args ? Logger.deepCopy(args) : {}}));
    }

    public log(): string {
        // eslint-disable-next-line no-console
        console.table(this._log);
        return JSON.stringify(this._log, null, 2);
    }

    private readonly _log: Record[];

    private static deepCopy(a: {}): {} {
        const copy = JSON.parse(JSON.stringify(a));

        // Add filename to ImportOptions
        if (
            'options' in copy && 'source' in copy.options && 'file' in copy.options.source
            && 'options' in a && 'source' in (a as {options: {}}).options
            && 'file' in (a as {options: {source: {}}}).options.source
        ) {
            copy.options.source.file
                = (a as {options: {source: {file: {name?: string}}}}).options.source.file.name;
        }
        return copy;
    }
}