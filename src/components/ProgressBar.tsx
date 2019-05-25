import * as React from 'react';
import {Link, ProgressIndicator, Text} from 'office-ui-fabric-react';
import * as style from './style.css';
import {Progress} from '../Store';
import {withTranslation} from 'react-i18next';
import {TranslateFunction} from './BaseProps';

interface Props extends TranslateFunction{
    // Fired when the "Stop" link is clicked.
    onClick: () => void;
    progress: Progress;
}

export class ProgressBarComponent extends React.Component<Props, {}> {
    public render(): JSX.Element {
        return (
            <div className={style.smallDivider}>{this.contents()}</div>
        );
    }

    private contents(): React.ReactNode {
        if (this.props.progress.show) {
            return (
                <>
                    <Text variant='small'>{this.stopLink()}</Text>
                    <ProgressIndicator percentComplete={this.props.progress.percent}/>
                </>
            );
        } else {
            return <Text variant='small'>&nbsp;</Text>;
        }
    }

    private stopLink(): React.ReactNode {
        if (this.props.progress.aborting) {
            return 'Stopping';
        } else {
            return <Link onClick={this.props.onClick}>Stop</Link>;
        }
    }
}

// @ts-ignore
export const ProgressBar = withTranslation('importExport')(ProgressBarComponent)