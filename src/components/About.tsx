import * as React from 'react';
import {Store} from '../Store';
import {connect} from '../connect';
import {DefaultButton, Link, Text} from 'office-ui-fabric-react';
import * as FileSaver from 'file-saver';
import {MemoryHistory} from 'history';
import * as style from './style.css';
import {BackButton} from './BackButton';
import {Pages} from '../Pages';
import {Link as RouterLink} from 'react-router-dom';
import {version} from '../version.json';

interface Props {
    store: Store;
    history: MemoryHistory;
}

export class AboutComponent extends React.Component<Props, {}> {
    public render(): React.ReactNode {
        return (
            /* eslint-disable max-len */
            <div className={style.pageMargin}>
                <BackButton onClick={this.props.history.goBack} />
                <br />
                <Text variant='xLarge'>
                    <Link
                        href='https://github.com/Emurasoft/excel-csv-import'
                        target='_blank'
                        rel='noopener noreferrer'
                        style={{color: 'black'}}
                        title={'CSV Import+Export on GitHub'}
                    >
                        <strong>{'CSV Import+Export'}</strong>
                    </Link>
                </Text>
                <br />
                <Text variant='medium' style={{fontFamily: 'Inconsolata, monospace'}}>
                    {version}
                </Text>
                <br /><br />
                <div className={style.fullWidth + ' ' + style.centerContent}>
                    <a
                        href={'EmEditor localized homepage [URL]'}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <img
                            style={{width: '150px'}}
                            src={'emeditor_logo.png'}
                            alt={'EmEditor logo'}
                        />
                    </a>
                </div>
                <Text variant='medium'>
                    EmEditor is a text editor which features a CSV editing interface and large file support. <Link href={'EmEditor localized homepage [URL]'}  target='_blank' rel='noopener noreferrer'>Try EmEditor for free.↗</Link>
                </Text>
                <br /><br />
                <Text variant='medium'>
                    <strong>{'Report bugs/send feedback'}</strong>
                    {
                        Store.enableFileExport(this.props.store.state.platform)
                            ? <><br />{'For bug reports, please attach the log file:'}</>
                            : null
                    }
                </Text>
                <br />
                {
                    Store.enableFileExport(this.props.store.state.platform)
                        ? <><DefaultButton onClick={this.exportLog} text={'Save log'} /><br /><br /></>
                        : null
                }
                <Text variant='medium'>
                    You can submit bug reports or feedback via:
                    <br /><Link href='https://www.emeditor.com/csv-importexport-contact-form/' target='_blank' rel='noopener noreferrer'>Contact form↗</Link>
                    <br /><Link href='https://github.com/Emurasoft/excel-csv-import/issues' target='_blank' rel='noopener noreferrer'>Issues page of the GitHub repo↗</Link>
                    {
                        Store.enableFileExport(this.props.store.state.platform)
                            ? <br />
                            : <><br />{'Please include system info such as OS name (Windows, macOS, etc.) in your message.'}<br /></>
                    }
                </Text>
                <br />
                <Text variant='medium'>
                    © 2019 Emurasoft Inc.
                    <br />
                    <RouterLink to={Pages.licenseInformation} className={style.removeUnderline}>
                        <Link>{'License information'}</Link>
                    </RouterLink>
                </Text>
            </div>
            /* eslint-enable max-len */
        );
    }

    public exportLog = () => {
        const blob = new Blob([this.props.store.log()]);
        FileSaver.saveAs(blob, 'csvImportExportLog.json');
    }
}

export default connect(AboutComponent);