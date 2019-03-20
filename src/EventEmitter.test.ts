import {EventEmitter} from './EventEmitter';

describe('EventEmitter', () => {
    it('emit()', (done) => {
        const emitter = new EventEmitter();
        emitter.emit();
        emitter.setListener(() => {throw new Error()});
        emitter.setListener(done);
        emitter.emit();
    });
});