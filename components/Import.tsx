import {Context, Store} from '../Store';
import * as React from 'react';
import {useContext, useState} from 'react';
import {PrimaryButton, TooltipDelay, TooltipHost} from '@fluentui/react';
import {InputType, NewlineSequence, Source} from '../Parser';
import {SourceInput} from './SourceInput';
import {DelimiterInput} from './DelimiterInput';
import {NewlineDropdown} from './NewlineDropdown';
import {EncodingDropdown} from './EncodingDropdown';
import {ProgressBar} from './ProgressBar';
import * as style from './style.css';
import {BottomBar} from './BottomBar';
import {ParserOutputBox} from './ParserOutputBox';
import {Page} from './Page';
import {namespacedUseLocalStorage} from '../useLocalStorage';

const useLocalStorage = namespacedUseLocalStorage('import');

export default function Import(): React.ReactElement {
	return <ImportComponent store={useContext(Context)} />
}

export function ImportComponent({store}: {store: Store}): React.ReactElement {
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
	} else if (!store.state.initialized) {
		buttonTooltipContent = 'Excel API is not initialized';
	} else {
		buttonTooltipContent = '';
	}

	return (
		<>
			<div className={style.pageMargin}>
				{/* eslint-disable no-undef */}
				<Page
					text={'Import CSV'}
					helpLink={
						'https://github.com/Emurasoft/excel-csv-import-help/blob/master/en.md'
					}
					mac={store.state.platform === Office.PlatformType.Mac}
				/>
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
						onClick={() => store.import({source, newline, delimiter, encoding})}
						text={'Import CSV'}
					/>
				</TooltipHost>
				<br />
				<ProgressBar
					onClick={store.abort}
					progress={store.state.progress}
				/>
				<ParserOutputBox parserOutput={store.state.parserOutput} />
				<BottomBar />
			</div>
		</>
	);
}