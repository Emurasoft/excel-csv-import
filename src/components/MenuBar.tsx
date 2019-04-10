import {CommandBar} from 'office-ui-fabric-react';
import * as React from 'react';
import {Pages} from '../Pages';
import {useTranslation} from 'react-i18next';

interface Props {
    hidden: boolean;
    onClick: (page: string) => void;
}

export function MenuBar(props: Props): JSX.Element {
    // Only shown on Excel for iPad because it has only one ribbon button for this app.
    if (props.hidden) {
        return null;
    }

    const {t} = useTranslation('importExport');

    return (
        <CommandBar
            items={[
                {
                    key: 'import',
                    name: t('Import CSV'),
                    iconProps: {iconName: 'Add'},
                    onClick: () => props.onClick(Pages.import),
                },
                {
                    key: 'export',
                    name: t('Export CSV'),
                    iconProps: {iconName: 'Download'},
                    onClick: () => props.onClick(Pages.export),
                },
            ]}
        />
    );
}