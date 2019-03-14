import {Import, ImportComponent} from './Import';
import {shallow} from 'enzyme';
import * as React from 'react';
import {ImportOptions, InputSource} from '../../Parser';
import {SourceInput} from './SourceInput';
import {DelimiterDropdown} from './DelimiterDropdown';
import {NewlineDropdown, NewlineSequence} from './NewlineDropdown';
import {Dropdown, PrimaryButton} from 'office-ui-fabric-react';
import * as assert from 'assert';

describe('Import', () => {
    it('import', () => {
        let receivedOptions = null;
        const stub: any = {};
        stub.state = {initialized: true};
        stub.import = (options) => receivedOptions = options
        const wrapper = shallow(<ImportComponent store={stub as any} />);

        wrapper.find(SourceInput)
            .simulate('change', {inputSource: InputSource.textinput, text: 'csv text'});
        wrapper.find(DelimiterDropdown).simulate('change', ',');
        wrapper.find(NewlineDropdown).simulate('change', NewlineSequence.LF);
        wrapper.find(Dropdown).simulate('change', null, 'UTF-8');
        wrapper.find(PrimaryButton).simulate('click');

        const expected: ImportOptions = {
            source: {inputSource: 1, text: 'csv text'},
            delimiter: ',',
            newline: '\n',
            encoding: 'UTF-8',
        };
        assert.deepStrictEqual(receivedOptions, expected);
    });
});