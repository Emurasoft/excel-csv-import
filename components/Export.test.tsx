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
import {Store, configureStore} from '@reduxjs/toolkit';
import {beforeEach, describe, expect, jest, test} from '@jest/globals';
import {any, anyFunction, mock} from 'jest-mock-extended';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import {init, useAppDispatch} from '../action';

jest.mock('../parser');

function Initializer({children}): React.ReactElement {
	useAppDispatch()(init());
	return children;
}

describe('Export', () => {
	function ExportWithContext({store}: {store: Store}): React.ReactElement {
		return <MemoryRouter><Provider store={store}><Initializer><Export /></Initializer></Provider></MemoryRouter>
	}

	test('export', async () => {
        window.localStorage.clear();
        window.localStorage.setItem('app-firstVisit', 'false');

        const parser = mock<Parser>();
        parser.csvStringAndName.calledWith(any(), any()).mockReturnValue({string: 'export result', name: ''});

        const store = configureStore({
            reducer,
            middleware: (getDefaultMiddleware) => 
                getDefaultMiddleware({
                    thunk: {
                        extraArgument: {parser}
                    },
                }),
        });
        
        const wrapper = render(<ExportWithContext store={store} />);

        await userEvent.click(wrapper.getByLabelText('Delimiter'));
		await userEvent.click(wrapper.getByText('Tab (U+0009)'));

        await userEvent.click(wrapper.getByLabelText('Newline sequence'));
		await userEvent.click(wrapper.getByText('LF'));

        await userEvent.click(wrapper.getByText('Export to CSV'));

        const expected: ExportOptions = {
            delimiter: '\t',
            newline: NewlineSequence.LF,
        }

        expect(parser.csvStringAndName).toHaveBeenCalledWith(expected, anyFunction());

        expect(wrapper.queryByText("export result")).not.toBeNull();
	});
});