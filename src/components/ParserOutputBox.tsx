import {OutputType, ParserOutput} from '../Store';
import {TextField} from '@fluentui/react';
import * as React from 'react';
import * as style from './style.css';

export function ParserOutputBox(props: {parserOutput: ParserOutput}): JSX.Element {
    switch (props.parserOutput.type) {
    case OutputType.hidden:
        return null;
    case OutputType.info:
        return (
            <TextField
                className={style.monospace}
                value={props.parserOutput.output}
                rows={20} multiline
                spellCheck={false}
                readOnly
            />
        );
    case OutputType.error:
        return (
            <TextField
                className={style.monospace  + ' ' + style.redText}
                value={props.parserOutput.output}
                rows={20} multiline
                spellCheck={false}
                readOnly
            />
        );
    }
}