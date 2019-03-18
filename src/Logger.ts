interface Record {
    readonly action: string;
    readonly args: {};
}

export class Logger {
    public constructor() {
        this._log = [];
    }

    // Adds action, and a deep copy of args if defined otherwise empty object, as a new record.
    public push(action: string, args?: {}): void {
        this._log.push(Object.freeze({action, args: args ? Logger.deepCopy(args) : {}}));
    }

    public log(): string {
        return JSON.stringify(this._log, null, 2);
    }

    private readonly _log: Record[];

    private static deepCopy(a: {}): {} {
        return JSON.parse(JSON.stringify(a));
    }
}