import * as React from 'react';
import {Store} from '../Store';
import {connect} from '../connect';
import {DefaultButton, IconButton, Text} from 'office-ui-fabric-react';
import * as FileSaver from 'file-saver';
import {MemoryHistory} from 'history';
import * as style from './style.css';

/* eslint-disable max-len */
export class AboutComponent extends React.Component<{store: Store; history: MemoryHistory}, {}> {
    public render(): React.ReactNode {
        return (
            <div className={style.pageMargin}>
                <IconButton
                    iconProps={{iconName: 'Back'}}
                    onClick={this.props.history.goBack}
                    ariaLabel='Go back'
                    title='Go back'
                />
                <br /><br />
                <Text variant='xLarge'>
                    <strong>CSV Import+Export</strong>
                </Text>
                <br />
                <Text variant='medium'>
                    <pre>
                        {this.props.store.state.version}
                    </pre>
                </Text>
                <Text variant='medium'>
                    Copyright 2019 Emurasoft Inc.
                </Text>
                <br /><br />
                <div className={style.fullWidth + ' ' + style.centerContent}>
                    <a href='https://www.emeditor.com/'>
                        <img className={style.emeditorLogo} src={'emeditor_logo.png'} alt='EmEditor logo' />
                    </a>
                </div>
                <Text variant='medium'>
                    EmEditor is a text editor which features CSV editing tools and large file support. <a href='https://www.emeditor.com/'>Try EmEditor for free.</a>
                </Text>
                <br /><br /><br />
                <Text variant='medium'>
                    <strong>
                    Report bugs/send feedback
                    </strong>
                </Text>
                <br />
                <Text variant='medium'>
                    For bug reports, please include the log file:
                </Text>
                <DefaultButton
                    onClick={this.exportLog}
                    title='Save log file for issue report'
                >
                    Save log
                </DefaultButton>
                <br /><br />
                <Text variant='medium'>
                    There are two ways to submit bug reports or feedback:<br />
                    <a href='https://www.emeditor.com/csv-importexport-contact-form/'>Via the contact form</a><br />
                    <a href='https://github.com/Emurasoft/excel-csv-import/issues'>Issues page of the GitHub repo</a>
                </Text>
                <br /><br /><br />
                <Text variant='medium'>
                    <strong>License info</strong><br />
                    CSV Import+Export is licensed under the MIT License. <a href='https://github.com/Emurasoft/excel-csv-import'>The source code is hosted on GitHub.</a>
                </Text>
                <textarea className={style.fullWidth} rows={10} readOnly>
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
                    A huge thank you goes to <a href='https://www.papaparse.com/'>Papa Parse</a> for their open-source CSV parser. Also thanks to all third-party libraries used in this app:
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

export default connect(AboutComponent);