import {StoredComponent} from './StoredComponent';
import {TranslateFunction} from './BaseProps';
import {withTranslation} from 'react-i18next';
import {Callout, IconButton, Text} from 'office-ui-fabric-react';
import * as React from 'react';
import * as style from './style.css';

interface Props extends TranslateFunction{
    text: string;
}

interface State {
    firstVisit: boolean;
    visible: boolean;
}

// TitleBar contains a question mark icon in the top right corner for linking to the help page.
// This app was designed to be self-explanatory, but Office Store policies demands that a getting
// started prompt is provided. Their platform, their own stupid rules.
// Policy 11.3: Your Office Add-in must provide a seamless first run experience, with a clear value
// proposition.
// Validation report: Please provide additional information on the first screen explaining how to
// use the add-in, or directing the user to help / configuration information.
export class TitleBarComponent extends StoredComponent<Props, State> {
    public constructor(props: Props) {
        super(props, 'app', {firstVisit: true, visible: false}, ['firstVisit']);
        this._save = true;
        this.state = {...this.state, ...StoredComponent.loadState('app', ['firstVisit'])};
        this._icon = React.createRef();
    }

    public render(): React.ReactNode {
        const t = this.props.t;
        return (
            <>
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Text variant='xLarge'><strong>{this.props.text}</strong></Text>
                    <div ref={this._icon} className={style.smallIcon}>
                        <IconButton
                            iconProps={{iconName: 'Help'}}
                            title={t('Help page')}
                            ariaLabel={t('Help page')}
                            href='https://github.com/Emurasoft/excel-csv-import'
                            target='_blank'
                            rel='noopener noreferrer'
                        />
                    </div>
                </div>
                <Callout
                    target={this._icon.current}
                    hidden={!this.state.visible}
                    onDismiss={() => this.setState({visible: false})}
                >
                    {t('CSV Import+Export makes it easy to add CSV data to Excel. Click on this' +
                        ' question mark to open the help page.')}
                </Callout>
            </>
        );
    }

    public componentDidMount(): void {
        this.setState(state => ({visible: state.firstVisit}));
        this.setState({firstVisit: false});
    }

    private readonly _icon: React.RefObject<HTMLDivElement>;
}

// @ts-ignore
export const TitleBar = withTranslation('importExport')(TitleBarComponent);