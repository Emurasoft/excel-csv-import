import {TextField} from '@fluentui/react';
import * as React from 'react';
import {AppState, OutputType} from '../state';

interface Props {
	output: AppState['output'];
}

export function ParserOutputBox({output}: Props): React.ReactElement {
	switch (output.type) {
	case OutputType.text:
		return (
			<TextField
				className="monospace"
				value={output.text}
				rows={20} multiline
				spellCheck={false}
				readOnly
			/>
		);
	case OutputType.error:
		return (
			<TextField
				className="monospace redText"
				value={output.error.toString() + '\n' + output.error.stack}
				rows={20} multiline
				spellCheck={false}
				readOnly
			/>
		);
	}

	return null;
}