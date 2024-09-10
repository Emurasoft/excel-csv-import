import * as React from 'react';
import { Button, Tooltip } from '@fluentui/react-components';
import { ArrowLeft24Filled } from '@fluentui/react-icons';

export function BackButton({ onClick }: { onClick: () => void }): React.ReactElement {
	return (
		<Tooltip content="Go back" relationship="label">
			<Button
				icon={<ArrowLeft24Filled />}
				onClick={onClick}
				appearance="subtle"
			/>
		</Tooltip>
	);
}
