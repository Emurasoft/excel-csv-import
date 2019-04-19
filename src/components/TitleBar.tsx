import {StoredComponent} from './StoredComponent';
import {TranslateFunction} from './BaseProps';
import {withTranslation} from 'react-i18next';
import {IconButton, PrimaryButton, Text} from 'office-ui-fabric-react';
import * as React from 'react';
import * as style from './style.css';

interface Props extends TranslateFunction{
    text: string;
    helpLink: string;
    mac: boolean;
}

interface State {
    firstVisit: boolean;
    visible: boolean;
}

// TitleBar contains the page title and a question mark icon in the top right corner for linking to
// the help page. This app was designed to be self-explanatory, but Office Store policies demands
// that a getting started prompt is provided. Their platform, their own stupid rules.
// Policy 11.3: Your Office Add-in must provide a seamless first run experience, with a clear value
// proposition.
// Validation report: Please provide additional information on the first screen explaining how to
// use the add-in, or directing the user to help / configuration information.
export class TitleBarComponent extends StoredComponent<Props, State> {
    public constructor(props: Props) {
        super(props, 'app', {firstVisit: true, visible: false}, ['firstVisit']);
        this._save = true;
        this.state = {...this.state, ...StoredComponent.loadState('app', ['firstVisit'])};
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
                    <div className={style.smallIcon}>
                        <IconButton
                            // Mac platform puts a big button in the top right corner
                            style={{marginRight: this.props.mac ? '30px' : '4px'}}
                            iconProps={{iconName: 'Help'}}
                            title={t('Help page')}
                            ariaLabel={t('Help page')}
                            href={this.props.helpLink}
                            target='_blank'
                            rel='noopener noreferrer'
                        />
                    </div>
                </div>
                <div
                    style={{
                        position: 'absolute',
                        zIndex: 1,
                        width: '100%',
                        height: '90%',
                        backgroundColor: '#FFFFFF',
                    }}
                    hidden={!this.state.visible}
                >
                    <div className={style.pageMargin}>
                        <Text variant='mediumPlus'>
                            {/* eslint-disable-next-line max-len */}
                            {t('CSV Import+Export can open and save CSV files of various formats. If you need any help, the "?" icon in the top right corner will take you to the help page.')}
                        </Text>
                        <br /><br />
                        <PrimaryButton
                            text={t('Continue')}
                            onClick={() => this.setState({visible: false, firstVisit: false})}
                        />
                    </div>
                </div>
            </>
        );
    }

    public componentDidMount(): void {
        this.setState(state => ({visible: state.firstVisit}));
    }
}

// @ts-ignore
export const TitleBar = withTranslation('importExport')(TitleBarComponent);