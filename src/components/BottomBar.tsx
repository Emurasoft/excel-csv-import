import * as style from './style.css';
import {Link, Text} from 'office-ui-fabric-react';
import * as React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Pages} from '../Pages';
import {useTranslation} from 'react-i18next';

export function BottomBar(): JSX.Element {
    const {t} = useTranslation('importExport');
    return (
        <div className={style.bottomBar}>
            <Text variant='medium'>
                <RouterLink to={Pages.about}><Link>{t('About')}</Link></RouterLink>
            </Text>
        </div>
    );
}