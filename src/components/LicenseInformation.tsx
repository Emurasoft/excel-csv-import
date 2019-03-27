import {MemoryHistory} from 'history';
import * as React from 'react';
import {BackButton} from './BackButton';
import {withTranslation} from 'react-i18next';
import * as style from './style.css';
import {Text} from 'office-ui-fabric-react';
import {TranslateFunction} from './BaseProps';

interface Props extends TranslateFunction {
    history: MemoryHistory
}

class LicenseInformation extends React.Component<Props> {
    render(): React.ReactNode {
        const t = this.props.t;
        return (
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
                <textarea className={style.fullWidth} rows={20} readOnly>{/* TODO add licenses */}
                    MIT License
                    &#10;
                    &#10;Copyright 2019 Emurasoft Inc.
                    &#10;
                    &#10;Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the &quot;Software&quot;), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
                    &#10;The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
                    &#10;THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                </textarea>
                <br/><br/>
                <Text variant='medium'>
                    {t('CSV Import+Export uses the following third-party libraries.')}
                </Text>
                <textarea className={style.fullWidth} rows={20} readOnly>
                </textarea>
            </div>
        );
    }
}

// @ts-ignore
export default withTranslation('licenseInformation')(LicenseInformation);