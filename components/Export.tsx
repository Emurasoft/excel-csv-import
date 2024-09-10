import * as React from 'react';
import {useState} from 'react';
import {DelimiterInput} from './DelimiterInput';
import {NewlineDropdown} from './NewlineDropdown';
import {
	Button,
	Dropdown,
	Label,
	mergeClasses,
	Option,
	Subtitle1,
	Textarea,
	Tooltip,
} from '@fluentui/react-components';
import {NewlineSequence} from '../parser';
import * as FileSaver from 'file-saver';
import {EncodingDropdown} from './EncodingDropdown';
import {ProgressBarWithStopButton} from './ProgressBar';
import {BottomBar} from './BottomBar';
import {ParserOutputBox} from './ParserOutputBox';
import {Page} from './Page';
import {namespacedUseLocalStorage} from '../useLocalStorage';
import {useAppSelector} from '../state';
import {abort, exportCSV, useAppDispatch} from '../action';
import {useStyles} from './styles';

export const enum ExportType {
	file = 'File',
	text = 'Textbox',
}

const useLocalStorage = namespacedUseLocalStorage('export');

export default function Export(): React.ReactElement {
	const initialized = useAppSelector(state => state.initialized);
	const platform = useAppSelector(state => state.platform);
	const progress = useAppSelector(state => state.progress);
	const output = useAppSelector(state => state.output);
	const dispatch = useAppDispatch();
	const styles = useStyles();

	const [exportType, setExportType] = useLocalStorage('exportType', ExportType.text);
	const [delimiter, setDelimiter] = useLocalStorage('delimiter', '\u002c');
	const [newline, setNewline] = useLocalStorage('newline', NewlineSequence.CRLF);
	const [encoding, setEncoding] = useLocalStorage('encoding', 'UTF-8');
	const [outputText, setOutputText] = useState('');

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
			setOutputText(csvStringAndName.string);
			return;
		}
		}
	};

	return (
		<Page
			text='Export CSV'
			helpLink='https://github.com/Emurasoft/excel-csv-import-help/blob/master/en.md#export-csv'
			mac={platform === Office.PlatformType.Mac}
		>
			<Label>
				<Subtitle1>Export type</Subtitle1>
				<br />
				<Dropdown
					placeholder='Delimiter'
					value={exportType}
					onOptionSelect={(_, {optionValue}) => setExportType(optionValue as ExportType)}
					id='exportTypeDropdown'
				>
					<Option>{ExportType.file}</Option>
					<Option>{ExportType.text}</Option>
				</Dropdown>
			</Label>
			<br />
			<br />
			{
				exportType === ExportType.file
					? (
						<>
							<EncodingDropdown
								value={encoding}
								onChange={setEncoding}
								showAutoDetect={false}
							/>
							<br />
							<br />
						</>
					)
					: null
			}
			<DelimiterInput
				value={delimiter}
				onChange={setDelimiter}
				showLengthError={false}
			/>
			<br />
			<br />
			<NewlineDropdown
				value={newline}
				onChange={setNewline}
				showAutoDetect={false}
			/>
			<br />
			<br />
			<Tooltip
				content={
					initialized
						? 'Export CSV'
						: 'Excel API is not initialized'
				}
				relationship='label'
			>
				<Button
					onClick={buttonOnClick}
					disabled={!initialized}
					appearance='primary'
				>
					Export to CSV
				</Button>
			</Tooltip>
			<br />
			<ProgressBarWithStopButton
				onClick={() => dispatch(abort())}
				progress={progress}
			/>
			{
				exportType == ExportType.text
					? (
						<Textarea
							value={outputText}
							readOnly
							placeholder='Export result'
							className={mergeClasses(styles.monospace, styles.fullWidth)}
							rows={15}
							spellCheck={false}
							wrap='off'
						/>
					)
					: null
			}
			<ParserOutputBox output={output} />
			<BottomBar />
		</Page>
	);
}
