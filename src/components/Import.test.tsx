import {ImportComponent} from './Import';
import {shallow} from 'enzyme';
import * as React from 'react';
import {InputType, NewlineSequence} from '../Parser';
import {SourceInput} from './SourceInput';
import {DelimiterDropdown} from './DelimiterDropdown';
import {NewlineDropdown} from './NewlineDropdown';
import {PrimaryButton} from 'office-ui-fabric-react';
import * as assert from 'assert';
import {EncodingDropdown} from './EncodingDropdown';

describe('ImportComponent', () => {
    it('import', () => {
        let receivedOptions = null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const stub: any = {};
        stub.state = {initialized: true};
        stub.import = (options) => receivedOptions = options
        const wrapper = shallow(<ImportComponent store={stub} />);

        wrapper.find(SourceInput)
            .simulate('change', {inputType: InputType.text, text: 'csv text'});
        wrapper.find(DelimiterDropdown).simulate('change', ',');
        wrapper.find(NewlineDropdown).simulate('change', NewlineSequence.LF);
        wrapper.find(EncodingDropdown).simulate('change', 'UTF-8');
        wrapper.find(PrimaryButton).simulate('click');

        const expected = {
            source: {inputType: 1, text: 'csv text'},
            delimiter: ',',
            newline: NewlineSequence.LF,
            encoding: 'UTF-8',
            processing: true,
        };
        assert.deepStrictEqual(receivedOptions, expected);
    });
});