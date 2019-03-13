import {shallow} from 'enzyme';
import {DelimiterInput, DropdownOptionKey} from './DelimiterInput';
import * as React from 'react';
import * as assert from 'assert';

describe('DelimiterInput', () => {
    it('dropdownChange', () => {
        const wrapper = shallow(<DelimiterInput onChange={() => {}} />);
        const dropdown = wrapper.find('#DelimiterInput-Dropdown');
        dropdown.simulate('change', null, {key: DropdownOptionKey.autoDetect});
        assert(!wrapper.exists('#DelimiterInput-TextField'));

        dropdown.simulate('change', null, {key: DropdownOptionKey.other});
        assert(wrapper.exists('#DelimiterInput-TextField'));
    });

    it('reset TextField when hidden', () => {
        const wrapper = shallow(<DelimiterInput onChange={() => {}} />);
        const dropdown = wrapper.find('#DelimiterInput-Dropdown');

        // Add text
        dropdown.simulate('change', null, {key: DropdownOptionKey.other});
        wrapper.find('#DelimiterInput-TextField').simulate('change', null, 'a');
        assert.strictEqual(wrapper.find('#DelimiterInput-TextField').getElement().props.value, 'a');

        // Hide then show textfield and check text
        dropdown.simulate('change', null, {key: DropdownOptionKey.autoDetect});
        dropdown.simulate('change', null, {key: DropdownOptionKey.other});
        assert.strictEqual(wrapper.find('#DelimiterInput-TextField').getElement().props.value, '');
    });

    it('onChangeCallback', () => {
        let result = null;

        function onChange(newDelimiter) {
            result = newDelimiter;
        }

        const wrapper = shallow(<DelimiterInput onChange={onChange} />);
        const dropdown = wrapper.find('#DelimiterInput-Dropdown');

        dropdown.simulate('change', null, {key: DropdownOptionKey.autoDetect});
        assert.strictEqual(result, '');

        dropdown.simulate('change', null, {key: DropdownOptionKey.comma});
        assert.strictEqual(result, '\u002c');

        dropdown.simulate('change', null, {key: DropdownOptionKey.space});
        assert.strictEqual(result, '\u0020');

        dropdown.simulate('change', null, {key: DropdownOptionKey.tab});
        assert.strictEqual(result, '\u0009');

        dropdown.simulate('change', null, {key: DropdownOptionKey.other});
        assert.strictEqual(result, '');

        const textfield = wrapper.find('#DelimiterInput-TextField');
        textfield.simulate('change', null, 'a');
        assert.strictEqual(result, 'a');

        textfield.simulate('change', null, 'aa');
        assert.strictEqual(result, null); // Invalid input calls null

        textfield.simulate('change', null, '');
        assert.strictEqual(result, '');

        dropdown.simulate('change', null, {key: DropdownOptionKey.comma});
        assert.strictEqual(result, '\u002c');
    });

    it('TextField description', () => {
        const wrapper = shallow(<DelimiterInput onChange={() => {}}/>);
        wrapper.find('#DelimiterInput-Dropdown')
            .simulate('change', null, {key: DropdownOptionKey.other});
        const textField = wrapper.find('#DelimiterInput-TextField')
        textField.simulate('change', null, '');
        assert(wrapper.html().includes('Auto-detect'));
        textField.simulate('change', null, 'a');
        assert(!wrapper.html().includes('Auto-detect') && wrapper.html().includes('U+0061'));
    });

    it('codePoint()', () => {
        // @ts-ignore
        assert.strictEqual(DelimiterInput.codePoint(','), 'U+002C');
        // @ts-ignore
        assert.strictEqual(DelimiterInput.codePoint('\u0100'), 'U+0100');
    });

    it('getErrorMessage()', () => {
        // @ts-ignore
        assert.strictEqual(DelimiterInput.getErrorMessage('a'), '');
        // @ts-ignore
        assert(DelimiterInput.getErrorMessage('aa') !== '');
    });

    // Error message rendering can't easily be tested, even with setTimeout
});