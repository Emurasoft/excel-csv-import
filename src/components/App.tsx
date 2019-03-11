import * as React from 'react';
import {CommandBar, ICommandBarItemProps} from 'office-ui-fabric-react/lib/CommandBar';
import {Import} from './Import';
import {Export} from './Export';

enum Page {import, export, report, about}

export class App extends React.Component<{}, {page: Page}> {
    public constructor(props: {}) {
        super(props);
        this.state = {
            page: Page.import,
        };
    }

    public render() {
        return (
            <>
                <CommandBar
                    items={this.commandBarItems()}
                    overflowItems={this.overflowItems()}
                /> {/*TODO Use ribbon menu instead of command bar*/}
                {App.pageComponent(this.state.page)}
            </>
        )
    }

    private commandBarItems(): ICommandBarItemProps[] {
        return [
            {
                key: 'import',
                name: 'Import',
                iconProps: {
                    iconName: 'Add'
                },
                onClick: () => this.setState({page: Page.import}),
            },
            {
                key: 'export',
                name: 'Export',
                iconProps: {
                    iconName: 'Download'
                },
                onClick: () => this.setState({page: Page.export}),
            }
        ];
    }

    private overflowItems(): ICommandBarItemProps[] {
        return [
            {
                key: 'report',
                name: 'Report issue',
                onClick: () => this.setState({page: Page.report}),
            },
            {
                key: 'about',
                name: 'About',
                onClick: () => this.setState({page: Page.about}),
            }
        ];
    }

    private static pageComponent(page: Page) {
        switch (page) {
        case Page.import:
            return <Import />
        case Page.export:
            return <Export />
        }
    }
}
