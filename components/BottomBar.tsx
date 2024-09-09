import {Link, Text} from '@fluentui/react-components';
import * as React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Pages} from '../Pages';
import { useStyles } from '../styles';

export function BottomBar(): React.ReactElement {
	const styles = useStyles();
	return (
		<div
			className={`${styles.centerContent} ${styles.fullWidth}`}
			style={{marginTop: '30px'}}
		>
			<Text size={400}>
				<RouterLink
					to={`/excel-csv-import/?page=${Pages.about}`}
					reloadDocument
				>
					<Link>About</Link>
				</RouterLink>
			</Text>
		</div>
	);
}
