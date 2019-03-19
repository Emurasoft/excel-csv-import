import * as React from 'react';
import * as style from './style.css';

export class ErrorBoundary extends React.Component<{}, {caughtError: boolean; error: Error}> {
    public constructor(props: {}) {
        super(props);

        this.state = {
            caughtError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error) {
        return {caughtError: true, error};
    }

    public render() {
        if (this.state.caughtError) {
            return (
                <>
                    <textarea
                        className={style.monospace + ' ' + style.fullWidth}
                        rows={15}
                        wrap='off'
                        readOnly
                    >
                        {this.state.error.stack}
                    </textarea>
                    <br />
                    <div>
                        If you are seeing this, sorry about that. I would appreciate it if you
                        sent me the above debugging info via the contact form:
                    </div>{/*TODO add contact form*/}
                </>
            );
        } else {
            return this.props.children;
        }
    }
}