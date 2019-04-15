import {shallow} from 'enzyme';
import {DelimiterInputComponent, DropdownOptionKey} from './DelimiterInput';
import * as React from 'react';
import * as assert from 'assert';
import {Dropdown, TextField} from 'office-ui-fabric-react';

describe('DelimiterInput', () => {
    it('custom input display status', () => {
        let value = ',';
        function onChange(v): void {
            value = v;
        }

        // When the user selects other, show custom input
        const wrapper0 = shallow(
            <DelimiterInputComponent
                value={value}
                onChange={onChange}
                showLengthError={true}
                // @ts-ignore
                t={k => k}
            />
        );
        assert(!wrapper0.exists(TextField));

        const dropdown = wrapper0.find(Dropdown);
        dropdown.simulate('change', null, {key: DropdownOptionKey.comma});
        assert(!wrapper0.exists(TextField));

        dropdown.simulate('change', null, {key: DropdownOptionKey.other});
        assert(wrapper0.exists(TextField));

        // Show custom input regardless of value if otherSelected == true
        wrapper0.setProps({value: ','});
        assert(wrapper0.exists(TextField));

        // Show custom input regardless of state if value is not a dropdown key
        // (Happens if value is loaded from storage)
        dropdown.simulate('change', null, {key: DropdownOptionKey.comma});
        wrapper0.setProps({value: ','});
        assert(!wrapper0.exists(TextField));

        dropdown.simulate('change', null, {key: DropdownOptionKey.comma});
        wrapper0.setProps({value: 'a'});
        assert(wrapper0.exists(TextField));

        wrapper0.setProps({value: ','});
        assert(!wrapper0.exists(TextField));

        // Test value matching for custom input when auto-detect is not an option
        const wrapper1 = shallow(
            <DelimiterInputComponent
                value={'a'}
                onChange={onChange}
                showAutoDetect={false}
                showLengthError={true}
                // @ts-ignore
                t={k => k}
            />
        );
        wrapper1.find(Dropdown).simulate('change', null, {key: DropdownOptionKey.comma});
        wrapper1.setProps({value: ''});
        assert(wrapper1.exists(TextField));
    });

    it('onChangeCallback', () => {
        let result = null;

        const wrapper = shallow(
            <DelimiterInputComponent
                value={''}
                onChange={(newDelimiter) => result = newDelimiter}
                showAutoDetect={true}
                showLengthError={true}
                // @ts-ignore
                t={k => k}
            />
        );
        const dropdown = wrapper.find(Dropdown);

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

        textfield.simulate('change', null, ',');
        assert.strictEqual(result, ',');

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
                <DelimiterInputComponent
                    value={''}
                    onChange={() => {}}
                    showAutoDetect={true}
                    showLengthError={true}
                    // @ts-ignore
                    t={k => k}
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
        assert.strictEqual(DelimiterInputComponent.codePoint(','), 'U+002C');
        // @ts-ignore
        assert.strictEqual(DelimiterInputComponent.codePoint('\u0100'), 'U+0100');
    });

    it('getErrorMessage()', () => {
        const dropdown0 = new DelimiterInputComponent({showLengthError: true, t: k => k})
        // @ts-ignore
        assert.strictEqual(dropdown0.getErrorMessage('a'), '');
        // @ts-ignore
        assert(dropdown0.getErrorMessage('aa') !== '');

        const dropdown1 = new DelimiterInputComponent({showLengthError: false, t: k => k});
        // @ts-ignore
        assert.strictEqual(dropdown1.getErrorMessage('aa'), '');
    });

    // Error message rendering can't easily be tested, even with setTimeout
});