import {Store} from '../../Store';
import * as React from 'react';
import {connect} from '../../connect';

class ExportComponent extends React.Component<{store: Store}, {}> {
    public render() {
        return (
            <div>export page</div>
        );
    }
}

export const Export = connect(ExportComponent);