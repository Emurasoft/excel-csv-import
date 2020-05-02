import {Context, Store} from '../Store';
import * as React from 'react';
import {useContext, useState} from 'react';
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
import {NewlineSequence} from '../Parser';
import * as FileSaver from 'file-saver';
import {EncodingDropdown} from './EncodingDropdown';
import {ProgressBar} from './ProgressBar';
import * as style from './style.css';
import {BottomBar} from './BottomBar';
import {ParserOutputBox} from './ParserOutputBox';
import {Page} from './Page';
import {namespacedUseLocalStorage} from '../useLocalStorage';

export const enum ExportType {file, text}

export default function Export(): React.ReactElement {
	return <ExportComponent store={useContext(Context)} />;
}

const useLocalStorage = namespacedUseLocalStorage('export');

export function ExportComponent({store}: {store: Store}): React.ReactElement {
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
	if (store.state.platform === Office.PlatformType.OfficeOnline) {
		exportTypeOptions.push({
			key: ExportType.file,
			text: 'File',
		});
	}

	const buttonOnClick = async () => {
		setOutputText('');

		const exportTypeCopy = exportType; // Copy current options before async task
		const encodingCopy = encoding;
		const csvStringAndName = await store.csvStringAndName({delimiter, newline});
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
			mac={store.state.platform === Office.PlatformType.Mac}
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
				exportType == ExportType.text
					? <TextField
						value={outputText} readOnly
						label={'Export result'}
						className={style.monospace}
						multiline rows={15}
						spellCheck={false}
						wrap='off'
					/>
					: null
			}
			<ParserOutputBox parserOutput={store.state.parserOutput} />
			<BottomBar />
		</Page>
	);
}