import {CommandBar} from 'office-ui-fabric-react';
import * as React from 'react';
import {Pages} from '../Pages';

interface Props {
    hidden: boolean;
    onClick: (page: string) => void;
}

export function MenuBar(props: Props): JSX.Element {
    // Only shown on Excel for iPad because it has only one ribbon button for this app.
    if (props.hidden) {
        return null;
    }

    return (
        <CommandBar
            items={[
                {
                    key: 'import',
                    name: 'Import CSV',
                    iconProps: {iconName: 'Add'},
                    onClick: () => props.onClick(Pages.import),
                },
                {
                    key: 'export',
                    name: 'Export CSV',
                    iconProps: {iconName: 'Download'},
                    onClick: () => props.onClick(Pages.export),
                },
            ]}
        />
    );
}