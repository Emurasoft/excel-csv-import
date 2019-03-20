// EventEmitter is an emitter of events. Not to be confused with EventEmitter.
export class EventEmitter {
    public constructor() {
        this._listener = () => {};
    }

    public setListener(callback: () => any) {
        this._listener = callback;
    }

    public emit() {
        this._listener();
    }

    private _listener: () => any;
}