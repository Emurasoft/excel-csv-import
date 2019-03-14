import {BaseProps} from './BaseProps';
import * as React from 'react';
import {Dropdown} from 'office-ui-fabric-react';
import {EncodingDropdownOptions} from './EncodingDropdownOptions';

export class EncodingDropdown extends React.Component<BaseProps<string> & {hidden: boolean}, {}> {
    public render() {
        if (this.props.hidden) {
            return null;
        } else {
            return (
                <>
                    <Dropdown
                        label="Encoding"
                        selectedKey={this.props.value}
                        options={EncodingDropdownOptions}
                        onChange={(_, option) => this.props.onChange(option.key as string)}
                    />
                    <br/>
                </>
            );
        }
    }
}