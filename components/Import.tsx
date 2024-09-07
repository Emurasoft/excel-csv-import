import * as React from 'react';
import {useState} from 'react';
import {Button, Tooltip} from '@fluentui/react-components';
import {InputType, NewlineSequence, Source} from '../parser';
import {SourceInput} from './SourceInput';
import {DelimiterInput} from './DelimiterInput';
import {NewlineDropdown} from './NewlineDropdown';
import {EncodingDropdown} from './EncodingDropdown';
import {ProgressBarWithStopButton} from './ProgressBar';
import {BottomBar} from './BottomBar';
import {ParserOutputBox} from './ParserOutputBox';
import {Page} from './Page';
import {namespacedUseLocalStorage} from '../useLocalStorage';
import {abort, importCSV, useAppDispatch} from '../action';
import {AppState, useAppSelector} from '../state';

const useLocalStorage = namespacedUseLocalStorage('import');

export default function Import(): React.ReactElement {
	const initialized = useAppSelector(state => state.initialized) as AppState['initialized'];
	const platform = useAppSelector(state => state.platform) as AppState['platform'];
	const progress = useAppSelector(state => state.progress) as AppState['progress'];
	const output = useAppSelector(state => state.output) as AppState['output'];
	const dispatch = useAppDispatch();

	const [source, setSource] = useState(
		{inputType: InputType.file, file: null, text: ''} as Source,
	);
	const [delimiter, setDelimiter] = useLocalStorage('delimiter', '\u002c');
	const [newline, setNewline] = useLocalStorage('newline', NewlineSequence.AutoDetect);
	const [encoding, setEncoding] = useLocalStorage('encoding', '');

	let buttonTooltipContent: string;
	if (source.inputType == InputType.file && source.file == null) {
		buttonTooltipContent = 'Import source is not selected';
	} else if (delimiter.length !== 1) {
		buttonTooltipContent = 'Delimiter is invalid';
	} else if (!initialized) {
		buttonTooltipContent = 'Excel API is not initialized';
	} else {
		buttonTooltipContent = '';
	}

	return (
		<Page
			text={'Import CSV'}
			helpLink={'https://github.com/Emurasoft/excel-csv-import-help/blob/master/en.md'}
			mac={platform === Office.PlatformType.Mac}
		>
			<SourceInput
				value={source}
				onChange={setSource}
			/>
			<br />
			{
				source.inputType === InputType.file
					? <EncodingDropdown
						value={encoding}
						onChange={setEncoding}
						showAutoDetect={true}
					/>
					: null
			}
			<br />
			<DelimiterInput
				value={delimiter}
				onChange={setDelimiter}
				showLengthError={true}
			/>
			<br />
			<br />
			<NewlineDropdown
				value={newline}
				onChange={setNewline}
				showAutoDetect={true}
			/>
			<br /><br />
			<Tooltip
				content={buttonTooltipContent}
				relationship='label'
			>
				<Button
					disabled={buttonTooltipContent !== ''}
					onClick={
						async () => dispatch(importCSV({source, newline, delimiter, encoding}))
					}
					appearance='primary'
				>
					Import CSV
				</Button>
			</Tooltip>
			<br />
			<ProgressBarWithStopButton
				onClick={() => dispatch(abort())}
				progress={progress}
			/>
			<ParserOutputBox output={output} />
			<BottomBar />
		</Page>
	);
}