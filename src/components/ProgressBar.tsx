import * as React from 'react';
import {Link, ProgressIndicator, Text} from 'office-ui-fabric-react';
import * as style from './style.css';

interface Props {
    // Fired when the "Stop" link is clicked.
    onClick: () => any;

    progress: number;
}

export class ProgressBar extends React.Component<Props, {}> {
    public render(): React.ReactNode {
        let contents: React.ReactNode;
        if (this.props.progress === 0.0) {
            contents = <Text variant='small'>&nbsp;</Text>;
        } else {
            contents = (
                <Text variant='small'>
                    <Link onClick={this.props.onClick}>Stop</Link>
                    <ProgressIndicator percentComplete={this.props.progress} />
                </Text>
            );
        }

        return (
            <div className={style.smallDivider}>
                {contents}
            </div>
        );
    }
}