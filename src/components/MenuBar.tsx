import {CommandBar} from 'office-ui-fabric-react';
import * as React from 'react';
import {Pages} from '../Pages';

interface Props {
    hidden: boolean;
    onClick: (page: string) => void;
}

export function MenuBar(props: Props): JSX.Element {
    if (props.hidden) {
        return null;
    }

    return (// TODO translations
        <>
            <CommandBar
                items={[
                    {key: 'import', name: 'Import', onClick: () => props.onClick(Pages.import)},
                    {key: 'export', name: 'Export', onClick: () => props.onClick(Pages.export)},
                ]}
            />
        </>
    );
}