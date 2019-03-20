import * as React from 'react';
import * as style from './style.css';

interface State {
    caughtError: boolean;
    error: Error;
}

export class ErrorBoundary extends React.Component<{}, State> {
    public constructor(props: {}) {
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
                    <textarea
                        value={this.state.error.stack}
                        className={style.monospace + ' ' + style.fullWidth}
                        rows={15}
                        wrap='off'
                        readOnly
                    />
                    <br />
                    <div>
                        If you are seeing this, sorry about that. I would appreciate it if you
                        sent me the above debugging info via the contact form:&nbsp;
                        <a href='https://www.emeditor.com/csv-importexport-contact-form/'>
                            https://www.emeditor.com/csv-importexport-contact-form/
                        </a>
                    </div>
                </>
            );
        } else {
            return this.props.children;
        }
    }
}