import {shallow} from 'enzyme';
import {SourceInput} from './SourceInput';
import * as React from 'react';
import {InputSource} from '../../Parser';
import * as assert from 'assert';

describe('SourceInput', () => {
    it('change input type', () => {
        const tests: {inputSource: InputSource, expectedSelector: string}[] = [
            {
                inputSource: InputSource.file,
                expectedSelector: '#SourceInput-FileInput',
            },
            {
                inputSource: InputSource.textinput,
                expectedSelector: '#SourceInput-TextInput',
            },
            {
                inputSource: InputSource.url,
                expectedSelector: '#SourceInput-URLInput',
            },
        ];

        for (const test of tests) {
            const wrapper = shallow(<SourceInput onChange={() => {}}/>);
            wrapper.find('#SourceInput-Dropdown').simulate('change', null, {key: test.inputSource});
            assert(wrapper.exists(test.expectedSelector));
        }
    });

    it('reset value on input type change', () => {
        const wrapper = shallow(<SourceInput onChange={() => {}}/>);

        // Write text to input
        wrapper.find('#SourceInput-Dropdown')
            .simulate('change', null, {key: InputSource.textinput});
        wrapper.find('#SourceInput-TextInput').simulate('change', null, 'some text');
        const currentvalue = wrapper.find('#SourceInput-TextInput').getElement().props.value;
        assert.strictEqual(currentvalue, 'some text');

        // Switch to url type and check value
        wrapper.find('#SourceInput-Dropdown').simulate('change', null, {key: InputSource.url});
        assert.strictEqual(wrapper.find('#SourceInput-URLInput').getElement().props.value, '');

        // Write text
        wrapper.find('#SourceInput-URLInput').simulate('change', null, 'a url');

        // Switch to text type and check value
        wrapper.find('#SourceInput-Dropdown')
            .simulate('change', null, {key: InputSource.textinput});
        wrapper.find('#SourceInput-TextInput').simulate('change', null, '');
    });

    it('input values', () => {
        let receivedValue = null;
        const wrapper = shallow(<SourceInput onChange={(v) => {receivedValue = v}}/>);

        wrapper.find('#SourceInput-Dropdown').simulate('change', null, {key: InputSource.file});
        wrapper.find('#SourceInput-FileInput').simulate('change', {target: {files: ['file']}});
        assert.deepStrictEqual(receivedValue, {inputSource: InputSource.file, value: 'file'});

        wrapper.find('#SourceInput-Dropdown')
            .simulate('change', null, {key: InputSource.textinput});
        wrapper.find('#SourceInput-TextInput').simulate('change', null, 'text');
        assert.deepStrictEqual(receivedValue, {inputSource: InputSource.textinput, value: 'text'});

        wrapper.find('#SourceInput-Dropdown').simulate('change', null, {key: InputSource.url});
        wrapper.find('#SourceInput-URLInput').simulate('change', null, 'url');
        assert.deepStrictEqual(receivedValue, {inputSource: InputSource.url, value: 'url'});
    });
});