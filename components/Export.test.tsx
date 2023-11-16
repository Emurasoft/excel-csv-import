import Export, {ExportType} from './Export';
import {mount} from 'enzyme';
import * as React from 'react';
import {ExportOptions, NewlineSequence, Parser} from '../parser';
import {DelimiterInput} from './DelimiterInput';
import {NewlineDropdown} from './NewlineDropdown';
import {PrimaryButton, TextField} from '@fluentui/react';
import * as assert from 'assert';
import {EncodingDropdown} from './EncodingDropdown';
import {MemoryRouter} from 'react-router';
import {Provider} from 'react-redux';
import {reducer} from '../reducer';
import {Store} from '@reduxjs/toolkit';
import {beforeEach, describe, expect, test} from '@jest/globals';

// describe('Export', () => {
// 	beforeEach(
// 		() => {
// 			window.localStorage.clear();
// 			window.localStorage.setItem('app-firstVisit', 'false');
// 		},
// 	);

// 	function ExportWithContext({store}: {store: Store}): React.ReactElement {
// 		return <MemoryRouter><Provider store={store}><Export /></Provider></MemoryRouter>
// 	}

// 	it('export text', async () => {
// 		const parser = sinon.stub(new Parser());
// 		parser.csvStringAndName.onFirstCall().resolves({string: 'export result', name: ''});

// 		const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument({parser})));
// 		const wrapper = mount(<ExportWithContext store={store} />);

// 		// @ts-ignore
// 		wrapper.find('#exportTypeDropdown').at(0).props().onChange(null, {key: ExportType.text});
// 		wrapper.find(DelimiterInput).props().onChange(',');
// 		wrapper.find(NewlineDropdown).props().onChange(NewlineSequence.LF);
// 		wrapper.update();
// 		await wrapper.find(PrimaryButton).props().onClick(null);

// 		const expected: ExportOptions = {
// 			delimiter: ',',
// 			newline: NewlineSequence.LF,
// 		}
// 		// @ts-ignore
// 		assert(parser.csvStringAndName.calledOnceWith(expected));
// 		wrapper.update();
// 		assert.strictEqual(wrapper.find(TextField).props().value, 'export result');
// 	});
// });