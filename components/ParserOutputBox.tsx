import {OutputType, ParserOutput} from '../Store';
import {TextField} from '@fluentui/react';
import * as React from 'react';
import * as style from './style.css';

interface Props {
	parserOutput: ParserOutput;
}

export function ParserOutputBox({parserOutput}: Props): React.ReactElement {
	if ([OutputType.info, OutputType.error].includes(parserOutput.type)) {
		let className: string;
		if (parserOutput.type === OutputType.info) {
			className = style.monospace;
		} else {
			className = style.monospace + ' ' + style.redText;
		}

		return (
			<TextField
				className={className}
				value={parserOutput.output}
				rows={20} multiline
				spellCheck={false}
				readOnly
			/>
		);
	}

	return null;
}