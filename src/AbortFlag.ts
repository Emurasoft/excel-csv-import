export class AbortFlag {
    public constructor() {
        this._aborted = false;
    }

    public abort(): void {
        this._aborted = true;
    }

    public aborted(): boolean {
        return this._aborted;
    }

    private _aborted: boolean;
}

export class AbortFlagArray {
    // Is this over-engineered? Yes, probably.
    public constructor() {
        this._array = [];
        this._closed = false;
    }

    public newFlag(): AbortFlag {
        const flag = new AbortFlag();
        if (this._closed) {
            flag.abort();
        } else {
            this._array.push(flag);
        }
        return flag;
    }

    public abort(): void {
        this._closed = true;
        for (const item of this._array) {
            item.abort();
        }
        this._array = [];
        this._closed = false;
    }

    private _array: AbortFlag[];
    private _closed: boolean;
}