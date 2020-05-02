import Import from './Import';
import {shallow} from 'enzyme';
import * as React from 'react';
import {InputType, NewlineSequence} from '../Parser';
import {SourceInput} from './SourceInput';
import {DelimiterInput} from './DelimiterInput';
import {NewlineDropdown} from './NewlineDropdown';
import {PrimaryButton} from '@fluentui/react';
import * as assert from 'assert';
import {EncodingDropdown} from './EncodingDropdown';

describe('ImportComponent', () => {
	beforeEach(() => window.localStorage.clear());

	it('import', () => {
		let receivedOptions = null;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const stub: any = {};
		stub.state = {initialized: true};
		stub.import = (options) => receivedOptions = options
		// @ts-ignore
		const wrapper = shallow(<Import store={stub} />);

		wrapper.find(SourceInput)
			.simulate('change', {inputType: InputType.text, text: 'csv text'});
		wrapper.find(DelimiterInput).simulate('change', ',');
		wrapper.find(NewlineDropdown).simulate('change', NewlineSequence.LF);
		wrapper.find(EncodingDropdown).simulate('change', 'UTF-8');
		wrapper.find(PrimaryButton).simulate('click');

		const expected = {
			source: {inputType: 1, text: 'csv text'},
			delimiter: ',',
			newline: NewlineSequence.LF,
			encoding: 'UTF-8',
		};
		assert.deepStrictEqual(receivedOptions, expected);
	});

	it('compatabilityTest', () => {
		window.localStorage.setItem('StoredComponent-save', '"true"');
		window.localStorage.setItem('import-delimiter', '"a"');
		window.localStorage.setItem('import-newline', '"\\n"');
		window.localStorage.setItem('import-encoding', '"UTF-8"');

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const stub: any = {};
		stub.state = {initialized: true};
		// @ts-ignore
		const wrapper = shallow(<Import store={stub} />);

		assert.strictEqual(wrapper.find(DelimiterInput).getElement().props.value, 'a');
		assert.strictEqual(
			wrapper.find(NewlineDropdown).getElement().props.value,
			NewlineSequence.LF,
		);
		assert.strictEqual(wrapper.find(EncodingDropdown).getElement().props.value, 'UTF-8');
	});
});