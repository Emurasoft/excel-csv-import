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
    public constructor() {
        this._array = [];
    }

    public newFlag(): AbortFlag {
        const flag = new AbortFlag();
        this._array.push(flag);
        return flag;
    }

    public abort(): void {
        for (const item of this._array) {
            item.abort();
        }
        this._array = [];
    }

    private _array: AbortFlag[];
}