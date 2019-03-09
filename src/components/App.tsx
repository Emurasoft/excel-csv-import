import * as React from 'react';
import {Store} from '../Store';
import {connect} from '../connect';
import {CommandBar} from 'office-ui-fabric-react/lib/CommandBar';

interface State {
    file: File;
}

class App extends React.Component<{store: Store}, State> {
    public componentDidMount() {
        this.props.store.initParser();
    }

    public render() {
        return (
            <>
                <CommandBar
                    items={this.commandBarItems()}
                    overflowItems={this.overflowItems()}
                />
            </>
        )
    }

    private commandBarItems() {
        return [
            {
                key: 'import',
                name: 'Import',
                iconProps: {
                    iconName: 'Add'
                },
            },
            {
                key: 'export',
                name: 'Export',
                iconProps: {
                    iconName: 'Download'
                }
            }
        ];
    }

    private overflowItems() {
        return [
            {
                key: 'report',
                name: 'Report issue',
            },
            {
                key: 'about',
                name: 'About',
            }
        ];
    }
}

export default connect(App);