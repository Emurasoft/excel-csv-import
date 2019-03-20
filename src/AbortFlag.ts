class AbortFlag {
    public constructor() {
        this.reset();
    }

    public abort(): void {
        this._aborted = true;
    }

    public aborted(): boolean {
        return this._aborted;
    }

    // Resets abort status. Should be called before async process starts.
    public reset(): void {
        this._aborted = false;
    }

    private _aborted: boolean;
}