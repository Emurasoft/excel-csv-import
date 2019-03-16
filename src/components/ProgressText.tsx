import * as React from 'react';
import {Text} from 'office-ui-fabric-react';
import * as style from './style.css';

export class ProgressText extends React.Component<{hidden: boolean}, {}> {
    public render(): React.ReactNode {
        if (this.props.hidden) {
            return null;
        } else {
            return (
                <div className={style.smallDivider}>
                    <Text variant='small'>
                        Processing
                    </Text>
                </div>
            )
        }
    }
}