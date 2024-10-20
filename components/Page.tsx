import {Button, Link, Text, Title1, Tooltip} from '@fluentui/react-components';
import * as React from 'react';
import {namespacedUseLocalStorage} from '../useLocalStorage';
import {Question32Regular} from '@fluentui/react-icons';
import {useStyles} from './styles';

interface Props {
	text: string;
	helpLink: string;
	mac: boolean;
	children: React.ReactElement[];
}

const useLocalStorage = namespacedUseLocalStorage('app');

// TitleBar contains the page title and a question mark icon in the top right corner for linking to
// the help page. This app was designed to be self-explanatory, but Office Store policies demands
// that a getting started prompt is provided. Their platform, their own stupid rules.
// Policy 11.3: Your Office Add-in must provide a seamless first run experience, with a clear value
// proposition.
// Validation report: Please provide additional information on the first screen explaining how to
// use the add-in, or directing the user to help / configuration information.
export function Page({text, helpLink, mac, children}: Props): React.ReactElement {
	const [firstVisit, setFirstVisit] = useLocalStorage('firstVisit', true);
	const styles = useStyles();

	return (
		<div className={styles.pageMargin}>
			<div
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<Title1>{text}</Title1>
				<Tooltip content='Help page' relationship='label'>
					<Link
						as='a'
						href={helpLink}
						target='_blank'
						rel='noopener noreferrer'
					>
						<Button
							icon={<Question32Regular />}
							style={{marginRight: mac ? '30px' : '4px'}}
							appearance='subtle'
						/>
					</Link>
				</Tooltip>
			</div>
			<br />
			{
				firstVisit
					? (
						<>
							<Text size={500}>
								CSV Import+Export can open and save CSV files of various formats. If you need any help, the &quot;?&quot; icon in the top right corner will take you to the help page.
							</Text>
							<br />
							<br />
							<Button
								onClick={() => setFirstVisit(false)}
							>
								Continue
							</Button>
						</>
					)
					: children
			}
		</div>
	);
}
