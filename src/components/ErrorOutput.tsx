import {OutputType, ParserOutput} from '../Store';
import {TextField} from 'office-ui-fabric-react';
import * as React from 'react';
import * as style from './style.css';

export function ErrorOutput(props: {parserOutput: ParserOutput}): JSX.Element {
    if (props.parserOutput.type === OutputType.error) {
        return (
            <TextField
                className={style.monospace  + ' ' + style.redText}
                value={props.parserOutput.output}
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