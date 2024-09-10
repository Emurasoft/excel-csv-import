import * as React from 'react';
import {Link, ProgressBar, Text} from '@fluentui/react-components';
import {AppState} from '../state';

interface Props {
	// Fired when the "Stop" link is clicked.
	onClick: () => void;
	progress: AppState['progress'];
}

export function ProgressBarWithStopButton({onClick, progress}: Props): React.ReactElement {
	let stopText: React.ReactElement;
	if (progress.aborting) {
		stopText = <Text size={300}>Stopping</Text>;
	} else {
		stopText = <Text size={300}><Link onClick={onClick}>Stop</Link></Text>;
	}

	return (
		<>
			{
				progress.show
					? (
						<>
							<Text size={300}>{stopText}</Text>
							<ProgressBar value={progress.percent} />
						</>
					)
					: <Text size={300}>&nbsp;</Text>
			}
		</>
	);
}
