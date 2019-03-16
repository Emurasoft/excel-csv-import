import * as React from 'react';
import {Text} from 'office-ui-fabric-react';
import * as style from './style.css';

export class ProgressText extends React.Component<{hidden: boolean}, {}> {
    public render(): React.ReactNode {
        return (
            <div className={style.smallDivider}>
                <Text variant='small'>
                    {this.props.hidden ? '\u00a0' : 'Processing'}
                </Text>
            </div>
        );
    }
}