import {Store} from '../Store';
import * as React from 'react';
import {connect} from '../connect';
import {ExportTypeDropdown} from './ExportTypeDropdown';
import {DelimiterDropdown} from './DelimiterDropdown';
import {NewlineDropdown, NewlineSequence} from './NewlineDropdown';
import {EncodingDropdownOptions} from './EncodingDropdownOptions';
import {Dropdown, PrimaryButton} from 'office-ui-fabric-react';
import {ExportOptions, ExportType} from '../Parser';

class ExportComponent extends React.Component<{store: Store}, ExportOptions> {
    public constructor(props: {store: Store}) {
        super(props);
        this.state = {
            exportType: ExportType.file,
            delimiter: ',',
            newlineSequence: NewlineSequence.CRLF,
            encoding: 'UTF-8',
        };
    }

    public render() {
        return (
            <>
                <ExportTypeDropdown
                    value={this.state.exportType}
                    onChange={(exportType) => this.setState({exportType})}
                />
                <br />
                <DelimiterDropdown
                    value={this.state.delimiter}
                    onChange={(delimiter) => this.setState({delimiter})}
                /> {/*TODO remove auto-detect option*/}
                <br />
                <NewlineDropdown
                    value={this.state.newlineSequence}
                    onChange={(newlineSequence) => this.setState({newlineSequence})}
                />
                <br />
                <Dropdown
                    label="Encoding"
                    selectedKey={this.state.encoding}
                    options={EncodingDropdownOptions}
                    onChange={(_, option) => this.setState({encoding: option as any})}
                />
                <br />
                <PrimaryButton
                    onClick={() => {}}
                >
                    Export as CSV
                </PrimaryButton>
            </>
        );
        // TODO if spreadsheet is big show notice that large files are not supported, below button
    }
}

export const Export = connect(ExportComponent);