import * as React from 'react';
import {useState} from 'react';
import {PrimaryButton, TooltipDelay, TooltipHost} from '@fluentui/react';
import {InputType, NewlineSequence, Source} from '../parser';
import {SourceInput} from './SourceInput';
import {DelimiterInput} from './DelimiterInput';
import {NewlineDropdown} from './NewlineDropdown';
import {EncodingDropdown} from './EncodingDropdown';
import {ProgressBar} from './ProgressBar';
import {BottomBar} from './BottomBar';
import {ParserOutputBox} from './ParserOutputBox';
import {Page} from './Page';
import {namespacedUseLocalStorage} from '../useLocalStorage';
import {useDispatch, useSelector} from 'react-redux'
import {abort, Dispatch, importCSV} from '../action';
import {AppState} from '../state';

const useLocalStorage = namespacedUseLocalStorage('import');

export default function Import(): React.ReactElement {
	const initialized = useSelector(state => state.initialized) as AppState['initialized'];
	const platform = useSelector(state => state.platform) as AppState['platform'];
	const progress = useSelector(state => state.progress) as AppState['progress'];
	const output = useSelector(state => state.output) as AppState['output'];
	const dispatch = useDispatch() as Dispatch;

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
			// eslint-disable-next-line no-undef
			mac={platform === Office.PlatformType.Mac}
		>
			{/* eslint-enable no-undef */}
			<SourceInput
				value={source}
				onChange={setSource}
			/>
			<br />
			<EncodingDropdown
				value={encoding}
				onChange={setEncoding}
				hidden={source.inputType === InputType.text}
				showAutoDetect={true}
			/>
			<DelimiterInput
				value={delimiter}
				onChange={setDelimiter}
				showLengthError={true}
			/>
			<br />
			<NewlineDropdown
				value={newline}
				onChange={setNewline}
				showAutoDetect={true}
			/>
			<br />
			<TooltipHost
				styles={{root: {display: 'inline-block'}} /* Resize to fit button */}
				content={buttonTooltipContent}
				delay={TooltipDelay.zero}
			>
				<PrimaryButton
					disabled={buttonTooltipContent !== ''}
					onClick={() => dispatch(importCSV({source, newline, delimiter, encoding}))}
					text={'Import CSV'}
				/>
			</TooltipHost>
			<br />
			<ProgressBar
				onClick={() => dispatch(abort())}
				progress={progress}
			/>
			<ParserOutputBox output={output} />
			<BottomBar />
		</Page>
	);
}