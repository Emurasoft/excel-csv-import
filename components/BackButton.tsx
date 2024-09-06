import * as React from 'react';
import {Button} from '@fluentui/react-components';
import {ArrowLeft24Filled} from '@fluentui/react-icons';

export function BackButton({onClick}: {onClick: () => void}): React.ReactElement {
	return (
		<Button
			icon={<ArrowLeft24Filled />}
			onClick={onClick}
			aria-label={'Go back'}
			title={'Go back'}
		/>
	);
}