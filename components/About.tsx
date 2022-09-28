import * as React from 'react';
import {Link, Text} from '@fluentui/react';
import * as style from './style.css';
import {BackButton} from './BackButton';
import {Pages} from '../Pages';
import {Link as RouterLink} from 'react-router-dom';

export default function About(): React.ReactElement {
	return (
		/* eslint-disable max-len */
		<div className={style.pageMargin}>
			<BackButton onClick={() => history.back()} />
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
			<Text>
				EmEditor is a text editor which features a CSV editing interface and large file support. <Link href={'https://www.emeditor.com/'}  target='_blank' rel='noopener noreferrer'>Try EmEditor for free.</Link>
			</Text>
			<br /><br />

			<Text>
				<strong>Help page</strong><br />
				<Link href='https://github.com/Emurasoft/excel-csv-import-help/blob/master/en.md' target='_blank' rel='noopener noreferrer'>
					View the help page here.
				</Link>
			</Text>
			<br /><br />

			<Text>
				<strong>Report bugs/send feedback</strong><br />
				Bug reports can be submitted via the <Link href='https://github.com/Emurasoft/excel-csv-import/issues' target='_blank' rel='noopener noreferrer'>issues page of our GitHub repo</Link> or the <Link href='https://www.emeditor.com/csv-importexport-contact-form/' target='_blank' rel='noopener noreferrer'>contact form</Link>.<br />
			</Text>
			<br /><br />
			<Text>
				© 2022 Emurasoft Inc.
				<br />
				<RouterLink to={Pages.licenseInformation} className={style.removeUnderline}>
					<Link>License information</Link>
				</RouterLink>
			</Text>
		</div>
		/* eslint-enable max-len */
	);
}
