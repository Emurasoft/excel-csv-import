import * as React from 'react';
import {Link, ProgressIndicator, Text} from '@fluentui/react';
import style from './style.css';
import {AppState} from '../state';

interface Props {
	// Fired when the "Stop" link is clicked.
	onClick: () => void;
	progress: AppState['progress'];
}

export function ProgressBar({onClick, progress}: Props): React.ReactElement {
	let stopText: React.ReactElement;
	if (progress.aborting) {
		stopText = <Text variant='small'>Stopping</Text>;
	} else {
		stopText = <Text variant='small'><Link onClick={onClick}>Stop</Link></Text>
	}

	return (
		<div className={style.smallDivider}>
			{
				progress.show
					? <>
						<Text variant='small'>{stopText}</Text>
						<ProgressIndicator percentComplete={progress.percent} />
					</>
					: <Text variant='small'>&nbsp;</Text>
			}
		</div>
	);
}