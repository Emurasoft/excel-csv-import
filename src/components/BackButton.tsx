import * as React from 'react';
import {IconButton} from 'office-ui-fabric-react';
import {useTranslation} from 'react-i18next';

export function BackButton(props: {onClick: () => void}): JSX.Element {
    const {t} = useTranslation('about');
    return (
        <IconButton
            iconProps={{iconName: 'Back'}}
            onClick={props.onClick}
            ariaLabel={t('Go back')}
            title={t('Go back')}
        />
    );
}