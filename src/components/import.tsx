import {Store} from '../Store';
import * as React from 'react';
import {connect} from '../connect';

class ImportComponent extends React.Component<{store: Store}, {}> {
    public render() {
        return (
            <div>import page</div>
        );
    }
}

export const Import = connect(ImportComponent);