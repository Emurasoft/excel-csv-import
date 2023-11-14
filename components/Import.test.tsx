import Import from './Import';
import {mount} from 'enzyme';
import * as React from 'react';
import {ImportOptions, InputType, NewlineSequence, Parser} from '../parser';
import {SourceInput} from './SourceInput';
import {DelimiterInput} from './DelimiterInput';
import {NewlineDropdown} from './NewlineDropdown';
import {PrimaryButton} from '@fluentui/react';
import * as assert from 'assert';
import {EncodingDropdown} from './EncodingDropdown';
import {reducer} from '../reducer';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router';
import * as sinon from 'sinon';
import {Store, configureStore} from '@reduxjs/toolkit';

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

	// it('import', async () => {
	// 	const parser = sinon.stub(new Parser());
	// 	parser.importCSV.resolves([]);
	// 	const store = configureStore({
	// 		reducer,
	// 		middleware: (getDefaultMiddleware) => 
	// 			getDefaultMiddleware({
	// 				thunk: {
	// 					extraArgument: {parser}
	// 				},
	// 			}),
	// 	});
	// 	const wrapper = mount(<ImportWithContext store={store} />);

	// 	// simulate() doesn't work
	// 	wrapper.find(SourceInput).props().onChange({inputType: InputType.text, text: 'csv text'});
	// 	wrapper.find(DelimiterInput).props().onChange(',');
	// 	wrapper.find(NewlineDropdown).props().onChange(NewlineSequence.LF);
	// 	wrapper.find(EncodingDropdown).props().onChange('UTF-8');
	// 	wrapper.update();
	// 	await wrapper.find(PrimaryButton).props().onClick(null);

	// 	const expected: ImportOptions = {
	// 		source: {inputType: 1, text: 'csv text'},
	// 		delimiter: ',',
	// 		newline: NewlineSequence.LF,
	// 		encoding: 'UTF-8',
	// 	};
	// 	// @ts-ignore
	// 	assert(parser.importCSV.calledOnceWith(expected));
	// });
});