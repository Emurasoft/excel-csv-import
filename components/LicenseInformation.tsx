import * as React from 'react';
import {BackButton} from './BackButton';
import {Link, Text} from '@fluentui/react-components';
import thisApp from './licenses/thisApp';
import thirdParty from './licenses/thirdParty';

export default function LicenseInformation(): React.ReactElement {
	return (
		<div className="style.pageMargin">
			<BackButton onClick={() => history.back()}/>
			<br/>
			<Text variant='xLarge'>
				<strong>License information</strong>
			</Text>
			<br/>
			<Text variant='medium'>
				{'CSV Import+Export is licensed under the MIT License.'}
			</Text>
			<textarea className="fullWidth" rows={20} value={thisApp} readOnly />
			<br/><br/>
			<Text variant='medium'>
				We would like to thank <Link href='https://www.papaparse.com/' target='_blank' rel='noopener noreferrer'>Papa Parse</Link> for their open-source CSV parser. CSV Import+Export also uses the following third-party libraries.
			</Text>
			<textarea className="fullWidth" rows={20} value={thirdParty} readOnly />
		</div>
	);
}
