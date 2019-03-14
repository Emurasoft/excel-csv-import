import {Store} from '../../Store';
import * as React from 'react';
import {connect} from '../../connect';
import {ExportType, ExportTypeDropdown} from './ExportTypeDropdown';

interface State {
    exportType: ExportType;
}

class ExportComponent extends React.Component<{store: Store}, State> {
    public constructor(props: {store: Store}) {
        super(props);
        this.state = {
            exportType: ExportType.file,
        };
    }

    public render() {
        return (
            <ExportTypeDropdown
                value={this.state.exportType}
                onChange={(exportType) => this.setState({exportType})}
            />
        );
    }
}

export const Export = connect(ExportComponent);