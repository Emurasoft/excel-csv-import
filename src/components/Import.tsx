import {Store} from '../Store';
import * as React from 'react';
import {connect} from '../connect';
import {Dropdown, IDropdownOption, Label} from 'office-ui-fabric-react';

enum FileSource {file, textfield, url}

interface State {
    fileSource: FileSource;
}

class ImportComponent extends React.Component<{store: Store}, State> {
    public constructor(props: {store: Store}) {
        super(props);
        this.state = {
            fileSource: FileSource.file,
        }
    }

    public render() {
        const fileSourceMenu: IDropdownOption[] = [
            {
                key: FileSource.file,
                text: 'File',
            },
            {
                key: FileSource.textfield,
                text: 'Text input',
            },
            {
                key: FileSource.url,
                text: 'URL',
            },
        ];

        return (
            <div>
                <Label>
                    Import type
                    <Dropdown
                        selectedKey={this.state.fileSource}
                        options={fileSourceMenu}
                        onChange={(_, o) => this.setState({fileSource: o.key as FileSource})}
                    />
                </Label>
                {this.state.fileSource}
            </div>
        );
    }
}

export const Import = connect(ImportComponent);