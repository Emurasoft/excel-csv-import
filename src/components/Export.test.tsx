import {ExportComponent} from './Export';
import {shallow} from 'enzyme';
import * as React from 'react';
import {ExportTypeDropdown} from './ExportTypeDropdown';
import {ExportType, NewlineSequence} from '../Parser';
import {DelimiterDropdown} from './DelimiterDropdown';
import {NewlineDropdown} from './NewlineDropdown';
import {PrimaryButton, TextField} from 'office-ui-fabric-react';
import * as assert from 'assert';

describe('ExportComponent', () => {
    it('export text', (done) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const store: any = {};
        store.state = {initialized: true};
        store.worksheetArea = () => 0;
        store.csvStringAndName = async (options) => {
            const expected = {
                exportType: ExportType.text,
                encoding: 'UTF-8',
                delimiter: ',',
                newline: NewlineSequence.LF,
                outputText: {
                    show: true,
                    text: '',
                },
                processing: true,
            }
            assert.deepStrictEqual(options, expected);
            return {string: 'export result'};
        }
        const wrapper = shallow(<ExportComponent store={store} />)
        wrapper.find(ExportTypeDropdown).simulate('change', ExportType.text);
        wrapper.find(DelimiterDropdown).simulate('change', ',');
        wrapper.find(NewlineDropdown).simulate('change', NewlineSequence.LF);
        wrapper.find(PrimaryButton).simulate('click');
        setTimeout(() => {
            assert.strictEqual(wrapper.find(TextField).getElement().props.value, 'export result');
            done();
        }, 2);
    });
});