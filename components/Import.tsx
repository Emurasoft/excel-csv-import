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

enum ValidationResult {
	Success = 'Import CSV',
	ImportFileNotSelected = 'Import file is not selected',
	DelimiterInvalid = 'Delimiter is invalid',
	APINotInit = 'Excel API is not initialized',
}

function validate(source: Source, delimiter: string, initialized: boolean): ValidationResult {
	if (source.inputType == InputType.file && source.file == null) {
		return ValidationResult.ImportFileNotSelected;
	} else if (delimiter.length !== 1) {
		return ValidationResult.DelimiterInvalid;
	} else if (!initialized) {
		return ValidationResult.APINotInit;
	}

	return ValidationResult.Success;
}

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

	return (
		<Page
			text='Import CSV'
			helpLink='https://github.com/Emurasoft/excel-csv-import-help/blob/master/en.md'
			mac={platform === Office.PlatformType.Mac}
		>
			<SourceInput
				value={source}
				onChange={setSource}
			/>
			<br />
			{
				source.inputType === InputType.file
					? (
							<EncodingDropdown
								value={encoding}
								onChange={setEncoding}
								showAutoDetect={true}
							/>
						)
					: null
			}
			<br />
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
			<br />
			<br />
			<Tooltip
				content={validate(source, delimiter, initialized)}
				relationship='label'
			>
				<Button
					disabled={validate(source, delimiter, initialized) !== ValidationResult.Success}
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
