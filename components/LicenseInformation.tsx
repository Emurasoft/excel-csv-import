import * as React from 'react';
import {BackButton} from './BackButton';
import {Link, Text, Textarea} from '@fluentui/react-components';
import thisApp from './licenses/thisApp';
import thirdParty from './licenses/thirdParty';
import {useStyles} from './styles';

export default function LicenseInformation(): React.ReactElement {
	const styles = useStyles();
	return (
		<div className={styles.pageMargin}>
			<BackButton onClick={() => history.back()} />
			<br />
			<Text size={600}>
				<strong>License information</strong>
			</Text>
			<br />
			<Text size={400}>
				CSV Import+Export is licensed under the MIT License.
			</Text>
			<Textarea className={styles.fullWidth} rows={20} value={thisApp} readOnly />
			<br />
			<br />
			<Text size={400}>
				We would like to thank <Link href='https://www.papaparse.com/' target='_blank' rel='noopener noreferrer'>Papa Parse</Link> for their open-source CSV parser. CSV Import+Export also uses the following third-party libraries.
			</Text>
			<Textarea className={styles.fullWidth} rows={20} value={thirdParty} readOnly />
		</div>
	);
}
