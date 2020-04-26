import * as React from 'react';
import {Store} from '../Store';
import {connect} from '../connect';
import {Link, Text} from 'office-ui-fabric-react';
import {MemoryHistory} from 'history';
import * as style from './style.css';
import {BackButton} from './BackButton';
import {Pages} from '../Pages';
import {Link as RouterLink} from 'react-router-dom';

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
                        <strong>CSV Import+Export</strong>
                    </Link>
                </Text>
                <br /><br />
                <div className={style.fullWidth + ' ' + style.centerContent}>
                    <a
                        href={'https://www.emeditor.com/'}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <img
                            style={{width: '150px'}}
                            src={'static/emeditor_logo.png'}
                            alt={'EmEditor logo'}
                        />
                    </a>
                </div>
                <Text variant='medium'>
                    EmEditor is a text editor which features a CSV editing interface and large file support. <Link href={'https://www.emeditor.com/'}  target='_blank' rel='noopener noreferrer'>Try EmEditor for free.↗</Link>
                </Text>
                <br /><br />
                <Text variant='medium'>
                    <strong>Report bugs/send feedback</strong><br />
                    Bug reports can be submitted via the <Link href='https://github.com/Emurasoft/excel-csv-import/issues' target='_blank' rel='noopener noreferrer'>issues page of our GitHub repo↗</Link> or the <Link href='https://www.emeditor.com/csv-importexport-contact-form/' target='_blank' rel='noopener noreferrer'>contact form↗</Link>.<br />
                </Text>
                <br /><br />
                <Text variant='medium'>
                    © 2019 Emurasoft Inc.
                    <br />
                    <RouterLink to={Pages.licenseInformation} className={style.removeUnderline}>
                        <Link>License information</Link>
                    </RouterLink>
                </Text>
            </div>
            /* eslint-enable max-len */
        );
    }
}

export default connect(AboutComponent);