import * as React from 'react';
import {StoreComponent} from '../Store';
import {connect} from '../connect';
import {DefaultButton, IconButton, Link, Text} from 'office-ui-fabric-react';
import * as FileSaver from 'file-saver';
import {MemoryHistory} from 'history';
import * as style from './style.css';
import {TranslateFunction} from './BaseProps';
import {Trans, withTranslation} from 'react-i18next';

interface Props extends TranslateFunction {
    store: StoreComponent;
    history: MemoryHistory;
}

/* eslint-disable max-len */
export class AboutComponent extends React.Component<Props, {}> {
    public render(): React.ReactNode {
        const t = this.props.t;
        return (// TODO test dark mode
            <div className={style.pageMargin}>
                <IconButton
                    iconProps={{iconName: 'Back'}}
                    onClick={this.props.history.goBack}
                    ariaLabel={t('Go back')}
                    title={t('Go back')}
                />
                <br /><br />
                <Text variant='xLarge'>
                    <strong>{t('app::CSV Import+Export')}</strong>
                </Text>
                <br />
                <Text variant='medium'>
                    <pre>{this.props.store.state.version}</pre>
                    <div className={style.smallDivider} />
                    Copyright 2019 Emurasoft Inc.
                    <br /><br />
                    <Link
                        href='https://github.com/Emurasoft/excel-csv-import'
                        className={style.greyText + ' ' + style.verticallyCenterContent}
                        target='_blank' rel='noopener noreferrer'
                    >
                        <img
                            src={'GitHub-Mark.svg'}
                            alt={t('Github logo')}
                            width='25px'
                            style={{marginRight: '6px'}}
                        />
                        {t('CSV Import+Export on Github')}
                    </Link>
                </Text>
                <br /><br />
                <div className={style.fullWidth + ' ' + style.centerContent}>
                    <a
                        href={t('EmEditor localized homepage [URL]')}
                        target='_blank' rel='noopener noreferrer'
                    >
                        <img
                            className={style.emeditorLogo}
                            src={'emeditor_logo.png'}
                            alt={t('EmEditor logo')}
                        />
                    </a>
                </div>
                <Text variant='medium'>
                    <Trans ns='about' i18nKey='EmEditor description [paragraph]'>
                        EmEditor is a text editor which features CSV editing tools and large file support. <Link href={t('EmEditor localized homepage [URL]')}  target='_blank' rel='noopener noreferrer'>Try EmEditor for free.</Link>
                    </Trans>
                </Text>
                <br /><br /><br />
                <Text variant='medium'>
                    <strong>{t('Report bugs/send feedback')}</strong>
                    <br />
                    {t('For bug reports, please attach the log file:')}
                </Text>
                <br />
                <DefaultButton onClick={this.exportLog} text={t('Save log')} />
                <br /><br />
                <Text variant='medium'>
                    <Trans ns='about' i18nKey='How to send feedback [paragraph]'>
                        There are two ways to submit bug reports or feedback:{/* <br> is added in locale file */}
                        <Link href='https://www.emeditor.com/csv-importexport-contact-form/' target='_blank' rel='noopener noreferrer'>Via the contact form ↗</Link>
                        <Link href='https://github.com/Emurasoft/excel-csv-import/issues' target='_blank' rel='noopener noreferrer'>Issues page of the GitHub repo ↗</Link>
                    </Trans>
                </Text>
                <br /><br /><br />
                <Text variant='medium'>
                    <strong>{t('License info')}</strong><br />
                    {t('CSV Import+Export is licensed under the MIT License.')}
                </Text>
                <textarea className={style.fullWidth} rows={10} readOnly>{/* TODO add licenses */}
                    MIT License
                    &#10;
                    &#10;Copyright 2019 Emurasoft Inc.
                    &#10;
                    &#10;Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the &quot;Software&quot;), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
                    &#10;The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
                    &#10;THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                </textarea>
                <br /><br />
                <Text variant='medium'>
                    <Trans ns='about' i18nKey='Third party libraries [paragraph]'>
                        A huge thank you goes to <Link href='https://www.papaparse.com/'  target='_blank' rel='noopener noreferrer'>Papa Parse</Link> for their open-source CSV parser. CSV Import+Export also uses the following third-party libraries:
                    </Trans>
                </Text>
                <textarea className={style.fullWidth} rows={20} readOnly>

                </textarea>
            </div>
        )
    }

    public exportLog = () => {
        const blob = new Blob([this.props.store.log()]);
        FileSaver.saveAs(blob, 'csvImportExportLog.json');
    }
}

export default withTranslation('about')(connect(AboutComponent));