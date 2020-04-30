import * as React from 'react';
import {IconButton} from '@fluentui/react';

export function BackButton({onClick}: {onClick: () => void}): React.ReactElement {
	return (
		<IconButton
			iconProps={{iconName: 'Back'}}
			onClick={onClick}
			ariaLabel={'Go back'}
			title={'Go back'}
		/>
	);
}