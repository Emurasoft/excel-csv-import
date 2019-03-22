import {shallow} from 'enzyme';
import {StoredComponent} from './StoredComponent';
import * as React from 'react';
import * as assert from 'assert';

describe('StoredComponent', () => {
    afterEach(() => localStorage.clear());

    class EmptyName extends StoredComponent<{}, {key0; key1}> {
        public constructor(props: {}) {
            super(props, '', {key0: 0, key1: 1}, ['key0', 'key1']);
        }
    }

    class Component extends StoredComponent<{}, {key0; key1}> {
        public constructor(props: {}) {
            super(props, 'name', {key0: 0, key1: 1}, ['key0', 'key1']);
        }
    }

    it('save values', () => {
        localStorage.setItem('name-key0', '"value0"');
        const wrapper0 = shallow(<Component />);
        assert.deepStrictEqual(wrapper0.state(), {key0: 0, key1: 1});
        localStorage.clear();

        localStorage.setItem('StoredComponent-save', '"true"');
        const wrapper1 = shallow(<Component />);
        assert.deepStrictEqual(wrapper1.state(), {key0: 0, key1: 1});

        localStorage.setItem('-key0', '"value0"');
        localStorage.setItem('-key1', '"value1"');
        localStorage.setItem('-skip', '"value2"');
        const wrapper2 = shallow(<EmptyName />);
        assert.deepStrictEqual(wrapper2.state(), {key0: 'value0', key1: 'value1'});

        localStorage.setItem('name-key0', '"value0"');
        localStorage.setItem('name-skip', '"value2"');
        const wrapper3 = shallow(<Component />);
        assert.deepStrictEqual(wrapper3.state(), {key0: 'value0', key1: 1});
    });

    it('setState()', () => {
        const originalLocalStorageLength = Object.entries(localStorage).length;
        const wrapper0 = shallow(<Component />);
        wrapper0.setState({'key0': 'v'});
        assert.strictEqual(localStorage['name-key0'], undefined);

        localStorage.setItem('StoredComponent-save', '"true"');
        const wrapper1 = shallow(<EmptyName />);
        wrapper1.setState({key0: 'a'});
        assert.strictEqual(localStorage['-key0'], '"a"');

        localStorage.clear();
        localStorage.setItem('StoredComponent-save', '"true"');
        const wrapper2 = shallow(<Component />);
        wrapper2.setState({});
        assert.strictEqual(Object.entries(localStorage).length, originalLocalStorageLength + 1);

        wrapper2.setState({key0: 'v'});
        wrapper2.setState({key1: {a: 0}});
        wrapper2.setState({skip: 0});
        assert.strictEqual(localStorage['name-key0'], '"v"');
        assert.strictEqual(localStorage['name-key1'], JSON.stringify({a: 0}));

        // Pass function
        localStorage.clear();
        wrapper2.setState(function() {});
        wrapper2.setState(() => {});
        assert.strictEqual(Object.entries(localStorage).length, originalLocalStorageLength);
    });

    it('setSaveStatus()', (done) => {
        class TestComponent0 extends StoredComponent<{}, {key}> {
            public constructor() {
                super({}, 'TestComponent0', {key: 0}, ['key']);
                this.setSaveStatus(false);
                assert.strictEqual(this.initialSaveStatus(), false);
                assert.strictEqual(localStorage['StoredComponent-save'], undefined);
            }

            public componentDidMount(): void {
                this.setState({key: 'value'});
                assert.strictEqual(localStorage['TestComponent0-key'], undefined);
            }
        }
        shallow(<TestComponent0 />);

        class TestComponent1 extends StoredComponent<{}, {key}> {
            public constructor() {
                super({}, 'TestComponent1', {key: 0}, ['key']);
                this.setSaveStatus(true);
                assert.strictEqual(this.initialSaveStatus(), false);
                assert.strictEqual(localStorage['StoredComponent-save'], '"true"');
            }

            public componentDidMount(): void {
                this.setState({key: 'value'});
                assert.strictEqual(localStorage['TestComponent1-key'], '"value"');
                done();
            }
        }
        shallow(<TestComponent1 />);
    });
});