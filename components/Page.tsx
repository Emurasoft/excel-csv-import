import {IconButton, PrimaryButton, Text} from '@fluentui/react';
import * as React from 'react';
import style from './style.css';
import {namespacedUseLocalStorage} from '../useLocalStorage';

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

	return (
		<div className={style.pageMargin}>
			<div
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<Text variant='xLarge'><strong>{text}</strong></Text>
				<div className={style.smallIcon}>
					<IconButton
						// Mac platform puts a big button in the top right corner
						style={{marginRight: mac ? '30px' : '4px'}}
						iconProps={{iconName: 'Help'}}
						title={'Help page'}
						ariaLabel={'Help page'}
						href={helpLink}
						target='_blank'
						rel='noopener noreferrer'
					/>
				</div>
			</div>
			{
				firstVisit
					? <>
						<Text variant='mediumPlus'>
							CSV Import+Export can open and save CSV files of various formats. If you need any help, the &quot;?&quot; icon in the top right corner will take you to the help page.
						</Text>
						<br /><br />
						<PrimaryButton
							text={'Continue'}
							onClick={() => setFirstVisit(false)}
						/>
					</>
					: children
			}
		</div>
	);
}