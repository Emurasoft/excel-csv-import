import {shallow} from 'enzyme';
import {DelimiterDropdown, DropdownOptionKey} from './DelimiterDropdown';
import * as React from 'react';
import * as assert from 'assert';
import {Dropdown, TextField} from 'office-ui-fabric-react';

describe('DelimiterDropdown', () => {
    it('showAutoDetect', () => {
        const wrapper0 = shallow(
            <DelimiterDropdown
                value={''}
                onChange={() => {}}
                showAutoDetect={false}
                showLengthError={true}
            />
        );
        assert(!wrapper0.html().includes('Auto-detect'))

        const wrapper1 = shallow(
            <DelimiterDropdown
                value={''}
                onChange={() => {}}
                showAutoDetect={true}
                showLengthError={true}
            />
        );
        assert(wrapper1.html().includes('Auto-detect'))
    });

    it('custom input display status', () => {
        let value = ',';
        function onChange(v) {
            value = v;
        }

        // When the user selects other, show custom input
        const wrapper0 = shallow(
            <DelimiterDropdown
                value={value}
                onChange={onChange}
                showAutoDetect={true}
                showLengthError={true}
            />
        );
        assert(!wrapper0.exists(TextField));

        const dropdown = wrapper0.find(Dropdown);
        dropdown.simulate('change', null, {key: DropdownOptionKey.autoDetect});
        assert(!wrapper0.exists(TextField));

        dropdown.simulate('change', null, {key: DropdownOptionKey.other});
        assert(wrapper0.exists(TextField));

        // Show custom input regardless of value if otherSelected == true
        wrapper0.setProps({value: ''});
        assert(wrapper0.exists(TextField));

        // Show custom input regardless of state if value is not a dropdown key
        // (Happens if value is loaded from storage)
        dropdown.simulate('change', null, {key: DropdownOptionKey.autoDetect});
        wrapper0.setProps({value: ''});
        assert(!wrapper0.exists(TextField));

        dropdown.simulate('change', null, {key: DropdownOptionKey.autoDetect});
        wrapper0.setProps({value: 'a'});
        assert(wrapper0.exists(TextField));

        wrapper0.setProps({value: ','});
        assert(!wrapper0.exists(TextField));

        // Test value matching for custom input when auto-detect is not an option
        const wrapper1 = shallow(
            <DelimiterDropdown
                value={'a'}
                onChange={onChange}
                showAutoDetect={false}
                showLengthError={true}
            />
        );
        wrapper1.find(Dropdown).simulate('change', null, {key: DropdownOptionKey.comma});
        wrapper1.setProps({value: ''});
        assert(wrapper1.exists(TextField));
    });

    it('onChangeCallback', () => {
        let result = null;

        const wrapper = shallow(
            <DelimiterDropdown
                value={''}
                onChange={(newDelimiter) => result = newDelimiter}
                showAutoDetect={true}
                showLengthError={true}
            />
        );
        const dropdown = wrapper.find(Dropdown);

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

        const textfield = wrapper.find(TextField);
        textfield.simulate('change', null, 'a');
        assert.strictEqual(result, 'a');

        textfield.simulate('change', null, '');
        assert.strictEqual(result, '');

        dropdown.simulate('change', null, {key: DropdownOptionKey.comma});
        assert.strictEqual(result, '\u002c');
    });

    it('TextField description', () => {
        const tests: {value: string; expectIncludes: string}[] = [
            {
                value: 'a',
                expectIncludes: 'U+0061',
            },
        ];

        for (const test of tests) {
            const wrapper = shallow(
                <DelimiterDropdown
                    value={''}
                    onChange={() => {}}
                    showAutoDetect={true}
                    showLengthError={true}
                />
            );
            wrapper.find(Dropdown)
                .simulate('change', null, {key: DropdownOptionKey.other});

            wrapper.setProps({value: test.value});
            assert(wrapper.html().includes(test.expectIncludes));
        }
    });

    it('codePoint()', () => {
        // @ts-ignore
        assert.strictEqual(DelimiterDropdown.codePoint(','), 'U+002C');
        // @ts-ignore
        assert.strictEqual(DelimiterDropdown.codePoint('\u0100'), 'U+0100');
    });

    it('getErrorMessage()', () => {
        const dropdown0 = new DelimiterDropdown({showLengthError: true})
        // @ts-ignore
        assert.strictEqual(dropdown0.getErrorMessage('a'), '');
        // @ts-ignore
        assert(dropdown0.getErrorMessage('aa') !== '');

        const dropdown1 = new DelimiterDropdown({showLengthError: false});
        // @ts-ignore
        assert.strictEqual(dropdown1.getErrorMessage('aa'), '');
    });

    // Error message rendering can't easily be tested, even with setTimeout
});