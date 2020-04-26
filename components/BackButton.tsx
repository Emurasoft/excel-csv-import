import * as React from 'react';
import {IconButton} from '@fluentui/react';

export function BackButton(props: {onClick: () => void}): JSX.Element {
	return (
		<IconButton
			iconProps={{iconName: 'Back'}}
			onClick={props.onClick}
			ariaLabel={'Go back'}
			title={'Go back'}
		/>
	);
}