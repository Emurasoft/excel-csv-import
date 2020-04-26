import {MemoryHistory} from 'history';
import * as React from 'react';
import {BackButton} from './BackButton';
import * as style from './style.css';
import {Link, Text} from '@fluentui/react';
import thisApp from './licenses/thisApp';
import thirdParty from './licenses/thirdParty';

interface Props {
	history: MemoryHistory;
}

class LicenseInformation extends React.Component<Props> {
	public render(): React.ReactNode {
		return (
		/* eslint-disable max-len */
			<div className={style.pageMargin}>
				<BackButton onClick={this.props.history.goBack}/>
				<br/>
				<Text variant='xLarge'>
					<strong>License information</strong>
				</Text>
				<br/>
				<Text variant='medium'>
					{'CSV Import+Export is licensed under the MIT License.'}
				</Text>
				<textarea className={style.fullWidth} rows={20} value={thisApp} readOnly />
				<br/><br/>
				<Text variant='medium'>
                    We would like to thank <Link href='https://www.papaparse.com/' target='_blank' rel='noopener noreferrer'>Papa Parse</Link> for their open-source CSV parser. CSV Import+Export also uses the following third-party libraries.
				</Text>
				<textarea className={style.fullWidth} rows={20} value={thirdParty} readOnly />
			</div>
		/* eslint-enable max-len */
		);
	}
}

export default LicenseInformation;