import {shallow} from 'enzyme';
import {SourceInput} from './SourceInput';
import * as React from 'react';
import {InputType, Source} from '../Parser';
import * as assert from 'assert';

describe('SourceInput', () => {
    it('change input type', () => {
        const tests: {source: Source, expectedSelector: string}[] = [
            {
                source: {inputType: InputType.file, text: ''},
                expectedSelector: '#SourceInput-FileInput',
            },
            {
                source: {inputType: InputType.text, text: ''},
                expectedSelector: '#SourceInput-TextInput',
            },
            {
                source: {inputType: InputType.url, text: ''},
                expectedSelector: '#SourceInput-URLInput',
            },
        ];

        for (const test of tests) {
            const wrapper = shallow(
                <SourceInput
                    value={test.source}
                    onChange={() => {}}
                 />
            );

            assert(wrapper.exists(test.expectedSelector));
        }
    });

    it('callback on input', () => {
        interface Test {
            inputType: InputType;
            elementSelector: string;
            onChangeArgs: any[];
            expected: Source;
        }
        const tests: Test[] = [
            {
                inputType: InputType.file,
                elementSelector: '#SourceInput-FileInput',
                onChangeArgs: [{target: {files: ['file']}}],
                expected: {inputType: InputType.file, file: 'file' as any, text: ''},
            },
            {
                inputType: InputType.text,
                elementSelector: '#SourceInput-TextInput',
                onChangeArgs: [null, 'text'],
                expected: {inputType: InputType.text, text: 'text'},
            },
            {
                inputType: InputType.url,
                elementSelector: '#SourceInput-URLInput',
                onChangeArgs: [null, 'url'],
                expected: {inputType: InputType.url, text: 'url'},
            },
        ];

        for (const test of tests) {
            let receivedValue: Source = {inputType: test.inputType, file: null, text: null};
            const wrapper = shallow(
                <SourceInput
                    value={receivedValue}
                    onChange={(v) => {receivedValue = v}}
                />
            );

            wrapper.find(test.elementSelector).simulate('change', ...test.onChangeArgs);
            assert.deepStrictEqual(receivedValue, test.expected);
        }
    });
});