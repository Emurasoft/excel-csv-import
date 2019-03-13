import {Store} from '../../Store';
import * as React from 'react';
import {connect} from '../../connect';
import {
    Dropdown,
    IDropdownOption,
    PrimaryButton,
    TextField,
    TooltipDelay,
    TooltipHost
} from 'office-ui-fabric-react';
import {ResponsiveMode} from 'office-ui-fabric-react/lib-commonjs/utilities/decorators/withResponsiveMode';
import {ImportOptions, InputSource, Source} from '../../Parser';
import {SourceInput} from './SourceInput';
import {DelimiterInput, DropdownOptionKey} from './DelimiterInput';

enum NewlineSequence {
    AutoDetect = '',
    CRLF = '\r\n',
    CR = '\r',
    LF = '\n'
}

interface State {
    source: Source;
    delimiter: string | null;
    newlineSequence: NewlineSequence;
    encoding: string;
}

class ImportComponent extends React.Component<{store: Store}, State> {
    public constructor(props: {store: Store}) {
        super(props);
        this.state = {
            source: {inputSource: InputSource.file, file: null, text: ''},
            delimiter: '',
            newlineSequence: NewlineSequence.AutoDetect,
            encoding: '',
        };
    }

    public render() {
        const newlineSequeneceMenu: IDropdownOption[] = [
            {
                key: NewlineSequence.AutoDetect,
                text: "Auto-detect",
            },
            {
                key: NewlineSequence.CRLF,
                text: "CRLF",
            },
            {
                key: NewlineSequence.CR,
                text: "CR",
            },
            {
                key: NewlineSequence.LF,
                text: "LF",
            },
        ];

        return (
            <>
                <SourceInput
                    value={this.state.source}
                    onChange={(source) => this.setState({source})}
                />
                <br />
                <DelimiterInput
                    value={this.state.delimiter}
                    onChange={(delimiter) => this.setState({delimiter})}
                />
                <br />
                <Dropdown
                    label="Newline sequence"
                    responsiveMode={ResponsiveMode.large}
                    selectedKey={this.state.newlineSequence}
                    options={newlineSequeneceMenu}
                    onChange={(_, option) => {
                        this.setState({newlineSequence: option.key as NewlineSequence})
                    }}
                />
                <br />
                <TextField
                    label="Encoding"
                    value={this.state.encoding}
                    onChange={(_, value) => this.setState({encoding: value})}
                />
                <br />
                <TooltipHost
                    styles={{root: {display: 'inline-block'}} /* Resize to fit button */}
                    content={this.buttonTooltipContent()}
                    delay={TooltipDelay.zero}
                >
                    <PrimaryButton disabled={this.buttonDisabled()} onClick={this.import}>
                        Import CSV
                    </PrimaryButton>
                </TooltipHost>
            </>
        );
    }

    private buttonTooltipContent = () => {
        if (this.state.source == null) {
            return 'Import source is not selected';
        } else if (this.state.delimiter.length > 1) {
            return 'Delimiter is invalid';
        } else if (!this.props.store.state.initialized) {
            return 'Excel API is not initialized';
        } else {
            return '';
        }
    }

    private buttonDisabled = () => {
        return !this.props.store.state.initialized
            || this.state.source.file == null
            || this.state.delimiter.length > 1;
    }

    private import = () => {
        const options: ImportOptions = {
            source: this.state.source,
            delimiter: this.state.delimiter,
            newline: this.state.newlineSequence,
            encoding: this.state.encoding,
        };
        this.props.store.import(options);
    }
}

export const Import = connect(ImportComponent);