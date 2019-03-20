import * as React from 'react';
import {Store} from '../Store';
import {connect} from '../connect';
import {DefaultButton, IconButton, Text} from 'office-ui-fabric-react';
import * as FileSaver from 'file-saver';

export class AboutComponent extends React.Component<{store: Store}, {}> {
    public render(): React.ReactNode {
        return (
            <div>
                <IconButton
                    iconProps={{iconName: 'Back'}}
                    onClick={() => window.history.back()}
                    ariaLabel='Go back'
                    title='Go back'
                />
                <br />
                <Text variant='medium'>
                    {this.props.store.state.version}
                </Text>
                <br /><br />
                <DefaultButton
                    onClick={this.exportLog}
                    title='Save log file for issue report'
                >
                    Save log
                </DefaultButton>
            </div>
        )
    }

    public exportLog = () => {
        const blob = new Blob([this.props.store.log()]);
        FileSaver.saveAs(blob, 'csvImportExportLog.json');
    }
}

export const About = connect(AboutComponent);