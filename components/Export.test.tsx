import {ExportComponent, ExportType} from './Export';
import {shallow} from 'enzyme';
import * as React from 'react';
import {NewlineSequence} from '../Parser';
import {DelimiterInput} from './DelimiterInput';
import {NewlineDropdown} from './NewlineDropdown';
import {PrimaryButton, TextField} from '@fluentui/react';
import * as assert from 'assert';

describe('ExportComponent', () => {
	afterEach(() => localStorage.clear());

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
					show: false,
					text: '',
				},
			}
			assert.deepStrictEqual(options, expected);
			return {string: 'export result'};
		}

		// @ts-ignore
		const wrapper = shallow(<ExportComponent store={store}/>)
		wrapper.find('#exportTypeDropdown').simulate('change', null, {key: ExportType.text});
		wrapper.find(DelimiterInput).simulate('change', ',');
		wrapper.find(NewlineDropdown).simulate('change', NewlineSequence.LF);
		wrapper.find(PrimaryButton).simulate('click');
		setTimeout(() => {
			assert.strictEqual(wrapper.find(TextField).getElement().props.value, 'export result');
			done();
		}, 2);
	});
});