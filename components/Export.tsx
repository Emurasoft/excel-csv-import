import {Context, Store} from '../Store';
import * as React from 'react';
import {DelimiterInput} from './DelimiterInput';
import {NewlineDropdown} from './NewlineDropdown';
import {
	Dropdown,
	IDropdownOption,
	PrimaryButton,
	TextField,
	TooltipHost,
	ResponsiveMode,
} from '@fluentui/react';
import {CsvStringAndName, ExportOptions, NewlineSequence} from '../Parser';
import * as FileSaver from 'file-saver';
import {EncodingDropdown} from './EncodingDropdown';
import {ProgressBar} from './ProgressBar';
import * as style from './style.css';
import {BottomBar} from './BottomBar';
import {ParserOutputBox} from './ParserOutputBox';
import {TitleBar} from './TitleBar';
import {useContext, useState} from 'react';
import {namespacedUseLocalStorage} from '../useLocalStorage';

export interface OutputText {
	// If show is false, do not show text.
	show: boolean;
	text: string;
}

export const enum ExportType {file, text}

interface State extends ExportOptions {
	exportType: ExportType;
	outputText: OutputText;
	encoding: string;
}

export default function Export(): React.ReactElement {
	return <ExportComponent store={useContext(Context)} />;
}

const useLocalStorage = namespacedUseLocalStorage('export');

export function ExportComponent({store}: {store: Store}): React.ReactElement {
	const [exportType, setExportType] = useLocalStorage('exportType', ExportType.text);
	const [delimiter, setDelimiter] = useLocalStorage('delimiter', '\u002c');
	const [newline, setNewline] = useLocalStorage('newline', NewlineSequence.CRLF);
	const [encoding, setEncoding] = useLocalStorage('encoding', 'UTF-8');
	const [outputText, setOutputText] = useState({show: false, text: ''} as OutputText);

	const exportTypeOptions: IDropdownOption[] = [{
		key: ExportType.text,
		text: 'Textbox',
	}];
	// Export file feature only works on Excel Online
	// https://github.com/Emurasoft/excel-csv-import/issues/39
	// eslint-disable-next-line no-undef
	if (store.state.platform === Office.PlatformType.OfficeOnline) {
		exportTypeOptions.push({
			key: ExportType.file,
			text: 'File',
		});
	}

	const helpLink
		= 'https://github.com/Emurasoft/excel-csv-import-help/blob/master/en.md#export-csv';

	const saveOrOutput = (csvStringAndName: CsvStringAndName, exportOptions: State): void => {
		switch (exportOptions.exportType) {
		case ExportType.file: {
			const options = {type: 'text/csv;charset=' + exportOptions.encoding};
			const blob = new Blob([csvStringAndName.string], options);
			FileSaver.saveAs(blob, csvStringAndName.name + '.csv');
			// state.outputText.show is already false
			return;
		}
		case ExportType.text: {
			setOutputText({show: !outputText.show, text: csvStringAndName.string})
			return;
		}
		}
	}

	const buttonOnClick = async () => {
		function newOutputText(state): OutputText {
			// If exportType is text:
			//      If last outputText.show was true, flip twice otherwise change once later
			// If exportType is a file, show is set to false once.
			if (state.exportType === ExportType.text) {
				if (state.outputText.show) {
					return {show: !state.outputText.show, text: state.outputText.text};
				}

				return {show: state.outputText.show, text: state.outputText.text};
			}

			return {show: false, text: ''};
		}

		const exportOptions: State = {exportType, delimiter, encoding, newline, outputText};

		setOutputText(newOutputText(exportOptions))

		const csvStringAndName = await store.csvStringAndName(exportOptions);
		if (csvStringAndName === null) {
			return;
		}

		saveOrOutput(csvStringAndName, exportOptions);
	}

	return (
		<>
			<div className={style.pageMargin}>
				{/* eslint-disable no-undef */}
				<TitleBar
					text={'Export CSV'}
					helpLink={helpLink}
					mac={store.state.platform === Office.PlatformType.Mac}
				/>
				{/* eslint-enable no-undef */}
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
						store.state.initialized
						? ''
						: 'Excel API is not initialized'
					}
				>
					<PrimaryButton
						onClick={buttonOnClick}
						disabled={!store.state.initialized}
						text={'Export to CSV'}
					/>
				</TooltipHost>
				<br />
				<ProgressBar
					onClick={store.abort}
					progress={store.state.progress}
				/>
				{
					outputText.show
					? <TextField
						label={'Export result'}
						className={style.monospace}
						multiline rows={15}
						spellCheck={false}
						wrap='off'
						value={outputText.text} readOnly
					/>
					: null
				}
				<ParserOutputBox parserOutput={store.state.parserOutput} />
				<BottomBar />
			</div>
		</>
	);
}