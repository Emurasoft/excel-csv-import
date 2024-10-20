import {Textarea} from '@fluentui/react-components';
import * as React from 'react';

interface State {
	caughtError: boolean;
	error: Error;
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
	public constructor(props: React.PropsWithChildren) {
		super(props);

		this.state = {
			caughtError: false,
			error: null,
		};
	}

	public static getDerivedStateFromError(error): State {
		return {caughtError: true, error};
	}

	public render(): React.ReactNode {
		if (this.state.caughtError) {
			return (
				<>
					<Textarea
						value={this.state.error.toString() + '\n' + this.state.error.stack}
						style={{
							fontFamily: 'monospace',
							width: '100%',
						}}
						rows={15}
						wrap='off'
						readOnly
					/>
					<br />
					<div>
						If you are seeing this, sorry about that. I would appreciate it if you
						sent me the above debugging info via the contact form:&nbsp;
						<a
							href='https://www.emeditor.com/csv-importexport-contact-form/'
							target='_blank'
							rel='noopener noreferrer'
						>
							https://www.emeditor.com/csv-importexport-contact-form/
						</a>
					</div>
				</>
			);
		}

		// eslint-disable-next-line react/prop-types
		return this.props.children;
	}
}
