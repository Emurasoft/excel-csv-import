import * as React from 'react';
import {Link, ProgressIndicator, Text} from 'office-ui-fabric-react';
import * as style from './style.css';
import {Progress} from '../Store';

interface Props {
    // Fired when the "Stop" link is clicked.
    onClick: () => any;
    progress: Progress;
}

export class ProgressBar extends React.Component<Props, {}> {
    public render(): React.ReactNode {
        let contents: React.ReactNode;
        if (this.props.progress.show) {
            contents = (
                <Text variant='small'>
                    <Link onClick={this.props.onClick}>Stop</Link>
                    <ProgressIndicator percentComplete={this.props.progress.percent} />
                </Text>
            );
        } else {
            contents = <Text variant='small'>&nbsp;</Text>;
        }

        return (
            <div className={style.smallDivider}>
                {contents}
            </div>
        );
    }
}