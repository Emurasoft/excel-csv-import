import {Link, Text} from '@fluentui/react-components';
import * as React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Pages} from '../Pages';

export function BottomBar(): React.ReactElement {
	return (
		<div
			className={"centerContent fullWidth"}
			style={{marginTop: '30px'}}
		>
			<Text size={400}>
				<RouterLink
					to={`/excel-csv-import/?page=${Pages.about}`}
					className="removeUnderline"
					reloadDocument
				>
					<Link>About</Link>
				</RouterLink>
			</Text>
		</div>
	);
}
