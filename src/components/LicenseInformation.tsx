import {MemoryHistory} from 'history';
import * as React from 'react';
import {BackButton} from './BackButton';
import {Trans, withTranslation} from 'react-i18next';
import * as style from './style.css';
import {Link, Text} from 'office-ui-fabric-react';
import {TranslateFunction} from './BaseProps';
import thisApp from '../licenses/thisApp';
import thirdParty from '../licenses/thirdParty';

interface Props extends TranslateFunction {
    history: MemoryHistory;
}

class LicenseInformation extends React.Component<Props> {
    public render(): React.ReactNode {
        const t = this.props.t;
        return (
            /* eslint-disable max-len */
            <div className={style.pageMargin}>
                <BackButton onClick={this.props.history.goBack}/>
                <br/>
                <Text variant='xLarge'>
                    <strong>{t('License information')}</strong>
                </Text>
                <br/>
                <Text variant='medium'>
                    {t('CSV Import+Export is licensed under the MIT License.')}
                </Text>
                <textarea className={style.fullWidth} rows={20} value={thisApp} readOnly />
                <br/><br/>
                <Text variant='medium'>
                    <Trans ns='licenseInformation' i18nKey='Third-party licenses [paragraph]'>
                        We would like to thank <Link href='https://www.papaparse.com/' target='_blank' rel='noopener noreferrer'>Papa Parse</Link> for their CSV parser. CSV Import+Export also uses the following third-party libraries.
                    </Trans>
                </Text>
                <textarea className={style.fullWidth} rows={20} value={thirdParty} readOnly />
            </div>
            /* eslint-enable max-len */
        );
    }
}

// @ts-ignore
export default withTranslation('licenseInformation')(LicenseInformation);