import Import from './Import';
import {mount} from 'enzyme';
import * as React from 'react';
import {ImportOptions, InputType, NewlineSequence, Parser} from '../Parser';
import {SourceInput} from './SourceInput';
import {DelimiterInput} from './DelimiterInput';
import {NewlineDropdown} from './NewlineDropdown';
import {PrimaryButton} from '@fluentui/react';
import * as assert from 'assert';
import {EncodingDropdown} from './EncodingDropdown';
import {applyMiddleware, createStore, Store} from 'redux';
import thunk from 'redux-thunk';
import {reducer} from '../reducer';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router';
import * as sinon from 'sinon';

describe('Import', () => {
	beforeEach(
		() => {
			sinon.restore();
			window.localStorage.clear();
			window.localStorage.setItem('app-firstVisit', 'false');
		},
	);

	function ImportWithContext({store}: {store: Store}): React.ReactElement {
		return <MemoryRouter><Provider store={store}><Import /></Provider></MemoryRouter>
	}

	it('import', () => {
		const parser = sinon.stub(new Parser());
		const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument({parser})));
		const wrapper = mount(<ImportWithContext store={store} />);

		// simulate() doesn't work
		wrapper.find(SourceInput).props().onChange({inputType: InputType.text, text: 'csv text'});
		wrapper.find(DelimiterInput).props().onChange(',');
		wrapper.find(NewlineDropdown).props().onChange(NewlineSequence.LF);
		wrapper.find(EncodingDropdown).props().onChange('UTF-8');
		wrapper.update();
		wrapper.find(PrimaryButton).props().onClick(null);

		const expected: ImportOptions = {
			source: {inputType: 1, text: 'csv text'},
			delimiter: ',',
			newline: NewlineSequence.LF,
			encoding: 'UTF-8',
		};
		// @ts-ignore
		assert(parser.importCSV.calledOnceWith(expected));
	});

	it('compatabilityTest', () => {
		window.localStorage.setItem('StoredComponent-save', '"true"');
		window.localStorage.setItem('import-delimiter', '"a"');
		window.localStorage.setItem('import-newline', '"\\n"');
		window.localStorage.setItem('import-encoding', '"UTF-8"');

		const parser = sinon.stub(new Parser());
		const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument({parser})));
		const wrapper = mount(<ImportWithContext store={store} />);

		assert.strictEqual(wrapper.find(DelimiterInput).getElement().props.value, 'a');
		assert.strictEqual(
			wrapper.find(NewlineDropdown).getElement().props.value,
			NewlineSequence.LF,
		);
		assert.strictEqual(wrapper.find(EncodingDropdown).getElement().props.value, 'UTF-8');
	});
});