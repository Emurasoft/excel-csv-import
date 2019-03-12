import {shallow} from 'enzyme';
import {DelimiterInput} from './DelimiterInput';
import * as React from 'react';
import * as assert from 'assert';

describe('DelimiterInput', () => {
    it('onChange', () => {
        let result = null;

        function onChange(newDelimiter) {
            result = newDelimiter;
        }
        const wrapper = shallow(<DelimiterInput onChange={onChange}/>);
        const textField = wrapper.find('#DelimiterInput-TextField')
        textField.simulate('change', null, 'a');
        assert.strictEqual(result, 'a');

        textField.simulate('change', null, 'aa');
        assert.strictEqual(result, null);
    });

    it('description', () => {
        const wrapper = shallow(<DelimiterInput onChange={() => {}}/>);
        const textField = wrapper.find('#DelimiterInput-TextField')
        textField.simulate('change', null, '');
        assert(wrapper.html().includes('Auto-detect'));
        textField.simulate('change', null, 'a');
        assert(!wrapper.html().includes('Auto-detect'));
    });

    // Error message can't easily be tested, even with setTimeout
});