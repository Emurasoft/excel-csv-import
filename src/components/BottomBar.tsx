import * as style from './style.css';
import {Link, Text} from 'office-ui-fabric-react';
import * as React from 'react';

export function BottomBar(): JSX.Element {
    return (
        <div className={style.bottomBar}>
            <Text variant='medium'>
                <Link href='?page=about'>About</Link>
            </Text>
        </div>
    );
}