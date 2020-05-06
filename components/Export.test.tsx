import Export, {ExportType} from './Export';
import {mount} from 'enzyme';
import * as React from 'react';
import {ExportOptions, NewlineSequence, Parser} from '../parser';
import {DelimiterInput} from './DelimiterInput';
import {NewlineDropdown} from './NewlineDropdown';
import {PrimaryButton, TextField} from '@fluentui/react';
import * as assert from 'assert';
import {EncodingDropdown} from './EncodingDropdown';
import {applyMiddleware, createStore, Store} from 'redux';
import {MemoryRouter} from 'react-router';
import {Provider} from 'react-redux';
import * as sinon from 'sinon';
import {reducer} from '../reducer';
import thunk from 'redux-thunk';

describe('Export', () => {
	beforeEach(
		() => {
			sinon.restore();
			window.localStorage.clear();
			window.localStorage.setItem('app-firstVisit', 'false');
		},
	);

	function ExportWithContext({store}: {store: Store}): React.ReactElement {
		return <MemoryRouter><Provider store={store}><Export /></Provider></MemoryRouter>
	}

	it('export text', (done) => {
		const parser = sinon.stub(new Parser());
		parser.csvStringAndName.onFirstCall().resolves({string: 'export result', name: ''});

		const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument({parser})));
		const wrapper = mount(<ExportWithContext store={store} />);

		// @ts-ignore
		wrapper.find('#exportTypeDropdown').at(0).props().onChange(null, {key: ExportType.text});
		wrapper.find(DelimiterInput).props().onChange(',');
		wrapper.find(NewlineDropdown).props().onChange(NewlineSequence.LF);
		wrapper.update();
		wrapper.find(PrimaryButton).props().onClick(null);

		const expected: ExportOptions = {
			delimiter: ',',
			newline: NewlineSequence.LF,
		}
		// @ts-ignore
		assert(parser.csvStringAndName.calledOnceWith(expected));
		setTimeout(
			() => {
				wrapper.update();
				assert.strictEqual(wrapper.find(TextField).props().value, 'export result');
				done();
			},
			2,
		);
	});

	it('compatability test', () => {
		window.localStorage.setItem('export-exportType', '1');
		window.localStorage.setItem('export-delimiter', '"a"');
		window.localStorage.setItem('export-newline', '"\\n"');
		window.localStorage.setItem('export-encoding', '"encoding"');

		const parser = sinon.stub(new Parser());
		const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument({parser})));
		const wrapper = mount(<ExportWithContext store={store} />);
		assert.strictEqual(
			wrapper.find('#exportTypeDropdown').at(0).getElement().props.selectedKey,
			1,
		);
		assert.strictEqual(wrapper.find(DelimiterInput).getElement().props.value, 'a');
		assert.strictEqual(
			wrapper.find(NewlineDropdown).getElement().props.value,
			NewlineSequence.LF,
		);
		assert.strictEqual(wrapper.find(EncodingDropdown).getElement().props.value, 'encoding');
	});
});