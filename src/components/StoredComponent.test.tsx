import {shallow} from 'enzyme';
import {StoredComponent} from './StoredComponent';
import * as React from 'react';
import * as assert from 'assert';

describe('StoredComponent', () => {
    afterEach(() => localStorage.clear());

    class Component extends StoredComponent {
        public constructor(props: {}) {
            super(props, 'name');
        }
    }

    it('componentDidMount()', () => {
        const wrapper0 = shallow(<Component />);
        assert.deepStrictEqual(wrapper0.state(), {});

        localStorage.setItem('name-a', '"value0"');
        localStorage.setItem('name-b', '"value1"');
        const wrapper1 = shallow(<Component />);
        assert.deepStrictEqual(wrapper1.state(), {a: 'value0', b: 'value1'});
    });

    it('setState()', () => {
        const originalLocalStorageLength = Object.entries(localStorage).length;
        const wrapper = shallow(<Component />);
        wrapper.setState({});
        assert.strictEqual(originalLocalStorageLength, 2);

        wrapper.setState({'key0': 'v'});
        wrapper.setState({'key1': {a: 0}})
        assert.strictEqual(localStorage['name-key0'], '"v"');
        assert.strictEqual(localStorage['name-key1'], JSON.stringify({a: 0}));

        // Pass function
        localStorage.clear();
        wrapper.setState(function() {});
        wrapper.setState(() => {});
        assert.strictEqual(originalLocalStorageLength, 2);
    });
});