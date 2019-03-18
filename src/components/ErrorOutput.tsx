import {ParserStatus} from '../Store';
import {TextField} from 'office-ui-fabric-react';
import * as React from 'react';
import * as style from './style.css';

export function ErrorOutput(props: {parserStatus: ParserStatus}): JSX.Element {
    if (props.parserStatus.errorOccurred) {
        return (
            <TextField
                className={style.monospace  + ' ' + style.redText}
                value={props.parserStatus.output}
                rows={20} multiline
                spellCheck={false}
                readOnly
                id='ErrorOutput-TextField'
            />
        );
    } else {
        return null;
    }
}