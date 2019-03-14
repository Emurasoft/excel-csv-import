import {Store} from '../Store';
import * as React from 'react';
import {connect} from '../connect';
import {ExportType, ExportTypeDropdown} from './ExportTypeDropdown';
import {DelimiterDropdown} from './DelimiterDropdown';

interface State {
    exportType: ExportType;
    delimiter: string;
}

class ExportComponent extends React.Component<{store: Store}, State> {
    public constructor(props: {store: Store}) {
        super(props);
        this.state = {
            exportType: ExportType.file,
            delimiter: ',',
        };
    }

    public render() {
        return (
            <>
                <ExportTypeDropdown
                    value={this.state.exportType}
                    onChange={(exportType) => this.setState({exportType})}
                />
                <DelimiterDropdown
                    value={this.state.delimiter}
                    onChange={(delimiter) => this.setState({delimiter})}
                /> {/*TODO remove auto-detect option*/}
            </>
        );
        // TODO if spreadsheet is big show notice that large files are not supported, below button
    }
}

export const Export = connect(ExportComponent);