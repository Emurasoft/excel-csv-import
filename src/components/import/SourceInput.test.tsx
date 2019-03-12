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
                inputSource: InputSource.textfield,
                expectedSelector: '#SourceInput-TextInput',
            },
            {
                inputSource: InputSource.url,
                expectedSelector: '#SourceInput-URLInput',
            },
        ];

        for (const test of tests) {
            const wrapper = shallow(<SourceInput onChange={(e) => {}}/>)
            wrapper.find('#SourceInput-Dropdown').simulate('change', null, {key: test.inputSource});
            assert(wrapper.exists(test.expectedSelector));
        }
    });
});