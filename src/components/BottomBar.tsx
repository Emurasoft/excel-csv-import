import * as style from './style.css';
import {Text} from 'office-ui-fabric-react';
import * as React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {paths} from './Paths';

export function BottomBar(): JSX.Element {
    return (
        <div className={style.bottomBar}>
            <Text variant='medium'>
                <RouterLink to={paths.about}>About</RouterLink>
            </Text>
        </div>
    );
}