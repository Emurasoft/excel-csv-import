import * as React from 'react';
import {Text} from 'office-ui-fabric-react';

export class ProgressText extends React.Component<{hidden: boolean}, {}> {
    public render() {
        if (this.props.hidden) {
            return null;
        } else {
            return (
                <div style={{marginTop: '5px'}}> {/*TODO global CSS*/}
                    <Text variant='small'>
                        Processing
                    </Text>
                </div>
            )
        }
    }
}