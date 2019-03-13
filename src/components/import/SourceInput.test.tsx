import {shallow} from 'enzyme';
import {SourceInput} from './SourceInput';
import * as React from 'react';
import {InputSource, Source} from '../../Parser';
import * as assert from 'assert';

describe('SourceInput', () => {
    it('change input type', () => {
        const tests: {source: Source, expectedSelector: string}[] = [
            {
                source: {inputSource: InputSource.file, text: ''},
                expectedSelector: '#SourceInput-FileInput',
            },
            {
                source: {inputSource: InputSource.textinput, text: ''},
                expectedSelector: '#SourceInput-TextInput',
            },
            {
                source: {inputSource: InputSource.url, text: ''},
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
            inputSource: InputSource;
            elementSelector: string;
            onChangeArgs: any[];
            expected: Source;
        }
        const tests: Test[] = [
            {
                inputSource: InputSource.file,
                elementSelector: '#SourceInput-FileInput',
                onChangeArgs: [{target: {files: ['file']}}],
                expected: {inputSource: InputSource.file, file: 'file' as any, text: ''},
            },
            {
                inputSource: InputSource.textinput,
                elementSelector: '#SourceInput-TextInput',
                onChangeArgs: [null, 'text'],
                expected: {inputSource: InputSource.textinput, text: 'text'},
            },
            {
                inputSource: InputSource.url,
                elementSelector: '#SourceInput-URLInput',
                onChangeArgs: [null, 'url'],
                expected: {inputSource: InputSource.url, text: 'url'},
            },
        ];

        for (const test of tests) {
            let receivedValue: Source = {inputSource: test.inputSource, file: null, text: null};
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