import {shallow} from 'enzyme';
import {DelimiterDropdown, DropdownOptionKey} from './DelimiterDropdown';
import * as React from 'react';
import * as assert from 'assert';

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

    it('dropdownChange', () => {
        const wrapper = shallow(
            <DelimiterDropdown
                value={''}
                onChange={() => {}}
                showAutoDetect={true}
                showLengthError={true}
            />
        );
        const dropdown = wrapper.find('#DelimiterDropdown-Dropdown');
        dropdown.simulate('change', null, {key: DropdownOptionKey.autoDetect});
        assert(!wrapper.exists('#DelimiterDropdown-TextField'));

        dropdown.simulate('change', null, {key: DropdownOptionKey.other});
        assert(wrapper.exists('#DelimiterDropdown-TextField'));
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
        const dropdown = wrapper.find('#DelimiterDropdown-Dropdown');

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

        const textfield = wrapper.find('#DelimiterDropdown-TextField');
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
            wrapper.find('#DelimiterDropdown-Dropdown')
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