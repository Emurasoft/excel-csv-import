import {ImportComponent} from './Import';
import {shallow} from 'enzyme';
import * as React from 'react';
import {ImportOptions, InputType, NewlineSequence} from '../Parser';
import {SourceInput} from './SourceInput';
import {DelimiterDropdown} from './DelimiterDropdown';
import {NewlineDropdown} from './NewlineDropdown';
import {PrimaryButton} from 'office-ui-fabric-react';
import * as assert from 'assert';
import {EncodingDropdown} from './EncodingDropdown';

describe('ImportComponent', () => {
    it('import', () => {
        let receivedOptions = null;
        const stub: any = {};
        stub.state = {initialized: true};
        stub.import = (options) => receivedOptions = options
        const wrapper = shallow(<ImportComponent store={stub as any} />);

        wrapper.find(SourceInput)
            .simulate('change', {inputType: InputType.text, text: 'csv text'});
        wrapper.find(DelimiterDropdown).simulate('change', ',');
        wrapper.find(NewlineDropdown).simulate('change', NewlineSequence.LF);
        wrapper.find(EncodingDropdown).simulate('change', 'UTF-8');
        wrapper.find(PrimaryButton).simulate('click');

        const expected: ImportOptions = {
            source: {inputType: 1, text: 'csv text'},
            delimiter: ',',
            newline: NewlineSequence.LF,
            encoding: 'UTF-8',
        };
        assert.deepStrictEqual(receivedOptions, expected);
    });
});