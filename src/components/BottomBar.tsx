import * as style from './style.css';
import {Link, Text} from 'office-ui-fabric-react';
import * as React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Pages} from '../Pages';

export function BottomBar(): JSX.Element {
    return (
        <div
            className={style.centerContent + ' ' + style.fullWidth}
            style={{marginTop: '30px'}}
        >
            <Text variant='medium'>
                <RouterLink to={Pages.about} className={style.removeUnderline}>
                    <Link>About</Link>
                </RouterLink>
            </Text>
        </div>
    );
}