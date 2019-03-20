import * as React from 'react';
import {Link, Text} from 'office-ui-fabric-react';
import * as style from './style.css';

interface Props {
    hidden: boolean;

    // Fired when the "Stop" link is clicked.
    onClick: () => any;
}

export class ProgressText extends React.Component<Props, {}> {
    public render(): React.ReactNode {
        let contents: React.ReactNode;
        if (!this.props.hidden) {
            contents = <Text variant='small'>&nbsp;</Text>;
        } else {
            contents = (
                <Text variant='small'>
                    Processing&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link onClick={this.props.onClick}>Stop</Link>
                </Text>
            )
        }

        return (
            <div className={style.smallDivider}>
                {contents}
            </div>
        );
    }
}