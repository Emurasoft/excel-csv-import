import {ExportComponent, ExportType} from './Export';
import {shallow} from 'enzyme';
import * as React from 'react';
import {NewlineSequence} from '../Parser';
import {DelimiterInput} from './DelimiterInput';
import {NewlineDropdown} from './NewlineDropdown';
import {PrimaryButton, TextField} from '@fluentui/react';
import * as assert from 'assert';
import {EncodingDropdown} from './EncodingDropdown';

describe('ExportComponent', () => {
	beforeEach(() => window.localStorage.clear());

	it('export text', (done) => {
		const store: any = {};
		store.state = {initialized: true};
		store.worksheetArea = () => 0;
		store.csvStringAndName = async (options) => {
			const expected = {
				delimiter: ',',
				newline: NewlineSequence.LF,
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

	it('compatability test', () => {
		window.localStorage.setItem('export-exportType', '1');
		window.localStorage.setItem('export-delimiter', '"a"');
		window.localStorage.setItem('export-newline', '"\\n"');
		window.localStorage.setItem('export-encoding', '"encoding"');

		const stub: any = {};
		stub.state = {initialized: true};
		stub.state.progress = {};
		stub.state.parserOutput = {};
		// @ts-ignore
		const wrapper = shallow(<ExportComponent store={stub} />);
		assert.strictEqual(wrapper.find('#exportTypeDropdown').getElement().props.selectedKey, 1);
		assert.strictEqual(wrapper.find(DelimiterInput).getElement().props.value, 'a');
		assert.strictEqual(
			wrapper.find(NewlineDropdown).getElement().props.value,
			NewlineSequence.LF,
		);
		assert.strictEqual(wrapper.find(EncodingDropdown).getElement().props.value, 'encoding');
	});
});