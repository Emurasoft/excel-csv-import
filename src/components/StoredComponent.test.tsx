import {shallow} from 'enzyme';
import {StoredComponent} from './StoredComponent';
import * as React from 'react';
import * as assert from 'assert';

describe('StoredComponent', () => {
    afterEach(() => localStorage.clear());

    class Component extends StoredComponent<{}, {key0, key1}> {
        public constructor(props: {}) {
            super(props, 'name', ['key0', 'key1']);
        }
    }

    it('componentDidMount()', () => {
        const wrapper0 = shallow(<Component />);
        localStorage.setItem('name-key0', '"value0"');
        assert.deepStrictEqual(wrapper0.state(), {});
        localStorage.clear();

        localStorage.setItem('StoredComponent-save', '"true"');
        const wrapper1 = shallow(<Component />);
        assert.deepStrictEqual(wrapper1.state(), {});

        localStorage.setItem('name-key0', '"value0"');
        localStorage.setItem('name-key1', '"value1"');
        localStorage.setItem('name-skip', '"value2"');
        const wrapper2 = shallow(<Component />);
        assert.deepStrictEqual(wrapper2.state(), {key0: 'value0', key1: 'value1'});
    });

    it('setState()', () => {
        const originalLocalStorageLength = Object.entries(localStorage).length;
        const wrapper0 = shallow(<Component />);
        wrapper0.setState({'key0': 'v'});
        assert.strictEqual(localStorage['name-key0'], undefined);

        localStorage.setItem('StoredComponent-save', '"true"');
        const wrapper1 = shallow(<Component />);
        wrapper1.setState({});
        assert.strictEqual(Object.entries(localStorage).length, originalLocalStorageLength + 1);

        wrapper1.setState({'key0': 'v'});
        wrapper1.setState({'key1': {a: 0}});
        wrapper1.setState({'skip': 0});
        assert.strictEqual(localStorage['name-key0'], '"v"');
        assert.strictEqual(localStorage['name-key1'], JSON.stringify({a: 0}));

        // Pass function
        localStorage.clear();
        wrapper1.setState(function() {});
        wrapper1.setState(() => {});
        assert.strictEqual(Object.entries(localStorage).length, originalLocalStorageLength);
    });
});