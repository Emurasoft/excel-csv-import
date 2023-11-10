import * as style from './style.css';
import {Link, Text} from '@fluentui/react';
import * as React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Pages} from '../Pages';

export function BottomBar(): React.ReactElement {
	return (
		<div
			className={style.centerContent + ' ' + style.fullWidth}
			style={{marginTop: '30px'}}
		>
			<Text variant='medium'>
				<RouterLink
					to={`/excel-csv-import/?page=${Pages.about}`}
					className={style.removeUnderline}
					reloadDocument
				>
					<Link>About</Link>
				</RouterLink>
			</Text>
		</div>
	);
}
