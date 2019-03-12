import * as React from 'react';
import * as style from '../style';
import {TextField} from 'office-ui-fabric-react';

interface Props {
    // Called with string if valid delimiter, or null if invalid.
    onChange: (newDelimiter: string | null) => void;
}

export class DelimiterInput extends React.Component<Props, {value: string}> {
    public constructor(props: Props) {
        super(props);
        this.state = {
            value: '',
        };
    }

    public render() {
        return (
            <TextField
                label="Delimiter"
                style={style.monospace}
                value={this.state.value}
                onChange={this.onChange}
                description={DelimiterInput.description(this.state.value)}
                onGetErrorMessage={DelimiterInput.getErrorMessage}
                deferredValidationTime={1}
                id="DelimiterInput-TextField"
            />
        );
    }

    private static valid(value: string) {
        return value.length <= 1;
    }

    private onChange = (_, value) => {
        this.setState({value});

        if (DelimiterInput.valid(value)) {
            this.props.onChange(value);
        } else {
            this.props.onChange(null);
        }
    }

    private static description(delimiter: string) {
        if (delimiter.length == 0) {
            return "Auto-detect";
        } else {
            return delimiter;
        }
    }

    private static getErrorMessage(value: string) {
        if (DelimiterInput.valid(value)) {
            return "";
        } else {
            return "Delimiter length must be 0 or 1";
        }
    }
}