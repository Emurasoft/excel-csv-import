import {Textarea} from '@fluentui/react-components';
import * as React from 'react';
import {AppState, OutputType} from '../state';

interface Props {
	output: AppState['output'];
}

export function ParserOutputBox({output}: Props): React.ReactElement {
	switch (output.type) {
	case OutputType.text:
		return (
			<Textarea
				className="monospace"
				value={output.text}
				rows={20}
				spellCheck={false}
				readOnly
			/>
		);
	case OutputType.error:
		return (
			<Textarea
				className="monospace redText"
				value={output.error.toString() + '\n' + output.error.stack}
				rows={20}
				spellCheck={false}
				readOnly
			/>
		);
	}

	return null;
}