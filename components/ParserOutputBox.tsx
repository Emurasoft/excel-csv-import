import {TextField} from '@fluentui/react';
import * as React from 'react';
import * as style from './style.css';
import {AppState, OutputType} from '../state';

interface Props {
	output: AppState['output'];
}

export function ParserOutputBox({output}: Props): React.ReactElement {
	switch (output.type) {
	case OutputType.text:
		return (
			<TextField
				className={style.monospace}
				value={output.text}
				rows={20} multiline
				spellCheck={false}
				readOnly
			/>
		);
	case OutputType.error:
		return (
			<TextField
				className={style.monospace + ' ' + style.redText}
				value={output.error.toString() + '\n' + output.error.stack}
				rows={20} multiline
				spellCheck={false}
				readOnly
			/>
		);
	}

	return null;
}