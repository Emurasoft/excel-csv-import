import * as React from 'react';
import {Body1, Link, Text, Title1} from '@fluentui/react-components';
import {BackButton} from './BackButton';
import {Pages} from '../Pages';
import {Link as RouterLink} from 'react-router-dom';
import { useStyles } from './styles';

export default function About(): React.ReactElement {
	const styles = useStyles();
	return (
		<div className={styles.pageMargin}>
			<BackButton onClick={() => history.back()} />
			<br />
			<Text size={600}>
				<Link
					href='https://github.com/Emurasoft/excel-csv-import'
					target='_blank'
					rel='noopener noreferrer'
					title={'CSV Import+Export on GitHub'}
				>
					<Title1>CSV Import+Export</Title1>
				</Link>
			</Text>
			<br /><br />
			<div className={`${styles.monospace} ${styles.centerContent}`}>
				<a
					href={'https://www.emeditor.com/'}
					target='_blank'
					rel='noopener noreferrer'
				>
					<img
						style={{width: '150px'}}
						src={'static/logo-minified-margins.svg'}
						alt={'EmEditor logo'}
					/>
				</a>
			</div>
			<Body1>
				EmEditor is a text editor which features a CSV editing interface and large file support. <Link href={'https://www.emeditor.com/'}  target='_blank' rel='noopener noreferrer'>Try EmEditor for free.</Link>
			</Body1>
			<br /><br />

			<Body1>
				<strong>Help page</strong><br />
				<Link href='https://github.com/Emurasoft/excel-csv-import-help/blob/master/en.md' target='_blank' rel='noopener noreferrer'>
					View the help page here.
				</Link>
			</Body1>
			<br /><br />

			<Body1>
				<strong>Report bugs/send feedback</strong><br />
				Bug reports can be submitted via the <Link href='https://github.com/Emurasoft/excel-csv-import/issues' target='_blank' rel='noopener noreferrer'>issues page of our GitHub repo</Link> or the <Link href='https://www.emeditor.com/csv-importexport-contact-form/' target='_blank' rel='noopener noreferrer'>contact form</Link>.<br />
			</Body1>
			<br /><br />
			<Body1>
				© 2023 Emurasoft Inc.
				<br />
				<RouterLink
					to={`/excel-csv-import/?page=${Pages.licenseInformation}`}
					reloadDocument
				>
					<Link>
						License information
					</Link>
				</RouterLink>
			</Body1>
		</div>
	);
}
