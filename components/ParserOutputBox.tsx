import {mergeClasses, Textarea} from '@fluentui/react-components';
import * as React from 'react';
import {AppState, OutputType} from '../state';
import {useStyles} from './styles';

interface Props {
	output: AppState['output'];
}

export function ParserOutputBox({output}: Props): React.ReactElement {
	const styles = useStyles();

	switch (output.type) {
		case OutputType.text:
			return (
				<Textarea
					className={styles.monospace}
					value={output.text}
					rows={20}
					spellCheck={false}
					readOnly
				/>
			);
		case OutputType.error:
			return (
				<Textarea
					className={mergeClasses(styles.monospace, styles.redText)}
					value={output.error.toString() + '\n' + output.error.stack}
					rows={20}
					spellCheck={false}
					readOnly
				/>
			);
	}

	return null;
}
