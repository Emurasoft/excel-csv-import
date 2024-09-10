import { makeStyles } from '@fluentui/react-components';

export const useStyles = makeStyles({
	pageMargin: {
		margin: '5px',
	},
	monospace: {
		fontFamily: 'Inconsolata, monospace',
		fontSize: '1.1em',
	},
	redText: {
		color: '#c50000',
	},
	fullWidth: {
		width: '100%',
	},
	centerContent: {
		display: 'flex',
		justifyContent: 'center',
	},
	removeUnderline: {
		textDecoration: 'none',
	},
});
