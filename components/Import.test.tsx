import Import from './Import';
import * as React from 'react';
import {ImportOptions, InputType, NewlineSequence, NumberFormat, Parser} from '../parser';
import {reducer} from '../reducer';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import {configureStore} from '@reduxjs/toolkit';
import {describe, expect, test} from '@jest/globals';
import {init, useAppDispatch} from '../action';
import {any, anyFunction, mock} from 'jest-mock-extended';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

function Initializer({children}): React.ReactElement {
	useAppDispatch()(init());
	return children;
}

describe('Import', () => {
	function ImportWithContext({store}: {store}): React.ReactElement {
		return (
			<MemoryRouter>
				<Provider store={store}><Initializer><Import /></Initializer></Provider>
			</MemoryRouter>
		);
	}

	test('import', async () => {
		window.localStorage.clear();
		window.localStorage.setItem('app-firstVisit', 'false');

		const parser = mock<Parser>();
		parser.importCSV.calledWith(any(), any()).mockReturnValue([]);

		const store = configureStore({
			reducer,
			middleware: getDefaultMiddleware =>
				getDefaultMiddleware({
					thunk: {
						extraArgument: {parser},
					},
				}),
		});
		const wrapper = render(<ImportWithContext store={store} />);

		await userEvent.click(wrapper.getByLabelText('Import type'));
		await userEvent.click(wrapper.getByText('Text input'));

		await userEvent.click(wrapper.getByRole('textbox'));
		await userEvent.keyboard('csv text');

		await userEvent.click(wrapper.getByLabelText('Delimiter'));
		await userEvent.click(wrapper.getByText('Tab'));

		await userEvent.click(wrapper.getByLabelText('Newline sequence'));
		await userEvent.click(wrapper.getByText('LF'));

		await userEvent.click(wrapper.getAllByText('Import CSV')[1]);

		const expected: ImportOptions = {
			source: {inputType: InputType.text, file: null, text: 'csv text'},
			delimiter: '\t',
			newline: NewlineSequence.LF,
			encoding: '',
			numberFormat: NumberFormat.Text,
		};
		expect(parser.importCSV).toBeCalledWith(expected, anyFunction());

		expect(wrapper.asFragment()).toMatchSnapshot();
	});
});
