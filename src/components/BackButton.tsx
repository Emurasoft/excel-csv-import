import * as React from 'react';
import {IconButton} from 'office-ui-fabric-react';

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