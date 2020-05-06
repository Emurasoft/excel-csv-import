import * as React from 'react';
import {useState} from 'react';
import {DelimiterInput} from './DelimiterInput';
import {NewlineDropdown} from './NewlineDropdown';
import {
	Dropdown,
	IDropdownOption,
	PrimaryButton,
	ResponsiveMode,
	TextField,
	TooltipHost,
} from '@fluentui/react';
import {NewlineSequence} from '../parser';
import * as FileSaver from 'file-saver';
import {EncodingDropdown} from './EncodingDropdown';
import {ProgressBar} from './ProgressBar';
import * as style from './style.css';
import {BottomBar} from './BottomBar';
import {ParserOutputBox} from './ParserOutputBox';
import {Page} from './Page';
import {namespacedUseLocalStorage} from '../useLocalStorage';
import {AppState} from '../state';
import {useDispatch, useSelector} from 'react-redux'
import {abort, Dispatch, exportCSV} from '../action';

export const enum ExportType {file, text}

const useLocalStorage = namespacedUseLocalStorage('export');

export default function Export(): React.ReactElement {
	const initialized = useSelector(state => state.initialized) as AppState['initialized'];
	const platform = useSelector(state => state.platform) as AppState['platform'];
	const progress = useSelector(state => state.progress) as AppState['progress'];
	const output = useSelector(state => state.output) as AppState['output'];
	const dispatch = useDispatch() as Dispatch;

	const [exportType, setExportType] = useLocalStorage('exportType', ExportType.text);
	const [delimiter, setDelimiter] = useLocalStorage('delimiter', '\u002c');
	const [newline, setNewline] = useLocalStorage('newline', NewlineSequence.CRLF);
	const [encoding, setEncoding] = useLocalStorage('encoding', 'UTF-8');
	const [outputText, setOutputText] = useState('');

	const exportTypeOptions: IDropdownOption[] = [{
		key: ExportType.text,
		text: 'Textbox',
	}];
	// Export file feature only works on Excel Online
	// https://github.com/Emurasoft/excel-csv-import/issues/39
	// eslint-disable-next-line no-undef
	if (platform === Office.PlatformType.OfficeOnline) {
		exportTypeOptions.push({
			key: ExportType.file,
			text: 'File',
		});
	}

	const buttonOnClick = async () => {
		setOutputText('');

		const exportTypeCopy = exportType; // Copy current options before async task
		const encodingCopy = encoding;
		const csvStringAndName = await dispatch(exportCSV({delimiter, newline}));
		if (csvStringAndName === null) {
			return;
		}

		switch (exportTypeCopy) {
		case ExportType.file: {
			const options = {type: 'text/csv;charset=' + encodingCopy};
			const blob = new Blob([csvStringAndName.string], options);
			FileSaver.saveAs(blob, csvStringAndName.name + '.csv');
			return;
		}
		case ExportType.text: {
			setOutputText(csvStringAndName.string)
			return;
		}
		}
	}

	return (
		<Page
			text={'Export CSV'}
			helpLink={
				'https://github.com/Emurasoft/excel-csv-import-help/blob/master/en.md#export-csv'
			}
			// eslint-disable-next-line no-undef
			mac={platform === Office.PlatformType.Mac}
		>
			<Dropdown
				label={'Export type'}
				options={exportTypeOptions}
				responsiveMode={ResponsiveMode.large}
				selectedKey={exportType}
				onChange={(_, option) => setExportType(option.key as ExportType)}
				id={'exportTypeDropdown'}
			/>
			<br />
			<EncodingDropdown
				value={encoding}
				onChange={setEncoding}
				hidden={exportType === ExportType.text /* TODO this parameter is unnecessary*/}
				showAutoDetect={false}
			/>
			<DelimiterInput
				value={delimiter}
				onChange={setDelimiter}
				showLengthError={false}
			/>
			<br />
			<NewlineDropdown
				value={newline}
				onChange={setNewline}
				showAutoDetect={false}
			/>
			<br />
			<TooltipHost
				styles={{root: {display: 'inline-block'}}}
				content={
					initialized
						? ''
						: 'Excel API is not initialized'
				}
			>
				<PrimaryButton
					onClick={buttonOnClick}
					disabled={!initialized}
					text={'Export to CSV'}
				/>
			</TooltipHost>
			<br />
			<ProgressBar
				onClick={() => dispatch(abort())}
				progress={progress}
			/>
			{
				exportType == ExportType.text
					? <TextField
						value={outputText} readOnly
						label={'Export result'}
						className={style.monospace}
						rows={15} multiline
						spellCheck={false}
						wrap='off'
					/>
					: null
			}
			<ParserOutputBox output={output} />
			<BottomBar />
		</Page>
	);
}