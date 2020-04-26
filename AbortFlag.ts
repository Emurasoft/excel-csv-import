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