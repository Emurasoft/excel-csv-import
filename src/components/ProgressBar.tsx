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
    public render(): React.ReactNode {
        let contents: React.ReactNode;
        if (this.props.progress.show) {
            contents = (
                <>
                    <Text variant='small'>
                        <Link onClick={this.props.onClick}>{this.props.t('Stop')}</Link>
                    </Text>
                    <ProgressIndicator percentComplete={this.props.progress.percent} />
                </>
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

// @ts-ignore
export const ProgressBar = withTranslation('importExport')(ProgressBarComponent)