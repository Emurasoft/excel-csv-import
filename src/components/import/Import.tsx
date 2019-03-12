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
import {ResponsiveMode} from 'office-ui-fabric-react/lib/utilities/decorators/withResponsiveMode';
import {ImportOptions, InputSource, Source} from '../../Parser';
import * as style from '../style'
import {SourceInput} from './SourceInput';

enum NewlineSequence {AutoDetect, CRLF, CR, LF}

interface State {
    inputSource: InputSource;
    source: Source | null;
    delimiter: string;
    newlineSequence: NewlineSequence;
    encoding: string;
}

class ImportComponent extends React.Component<{store: Store}, State> {
    public constructor(props: {store: Store}) {
        super(props);
        this.state = {
            inputSource: InputSource.file,
            source: null,
            delimiter: "",
            newlineSequence: NewlineSequence.AutoDetect,
            encoding: "",
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
            <div>
                <SourceInput onChange={(source) => this.setState({source})} />
                <br />
                <TextField
                    label="Delimiter"
                    style={style.monospace}
                    value={this.state.delimiter}
                    description={ImportComponent.delimiterDescription(this.state.delimiter)}
                    onChange={(_, value) => this.setState({delimiter: value})}
                    onGetErrorMessage={ImportComponent.validateDelimiter}
                    deferredValidationTime={20}
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
                {/*TODO should be a searchable dropdown*/}
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
            </div>
        );
    }

    private static delimiterDescription(delimiter: string) {
        if (delimiter.length == 0) {
            return "Auto-detect";
        } else {
            return delimiter;
        }
    }

    private static validateDelimiter(value: string) {
        if (value.length > 1) {
            return "Delimiter length must be 0 or 1";
        } else {
            return "";
        }
    }

    private buttonTooltipContent = () => {
        if (this.state.source == null) {
            return "Import source is not selected"
        } else if (!this.props.store.state.initialized) {
            return "Excel API is not initialized";
        } else {
            return "";
        }
    }

    private buttonDisabled = () => {
        return !this.props.store.state.initialized || this.state.source == null;
    }

    private import = () => {
        const newlineMap = {
            [NewlineSequence.AutoDetect]: '',
            [NewlineSequence.CRLF]: '\r\n',
            [NewlineSequence.CR]: '\r',
            [NewlineSequence.LF]: '\n',
        }

        const options: ImportOptions = {
            source: this.state.source,
            delimiter: this.state.delimiter,
            newline: newlineMap[this.state.newlineSequence],
            encoding: this.state.encoding,
        };
        this.props.store.import(options);
    }
}

export const Import = connect(ImportComponent);