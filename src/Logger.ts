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
        console.table(this._log);
        return JSON.stringify(this._log, null, 2);
    }

    private readonly _log: Record[];

    private static deepCopy(a: {}): {} {
        // TODO file name is not copied
        return JSON.parse(JSON.stringify(a));
    }
}