import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {CompoundButton} from 'office-ui-fabric-react';
import * as FileSaver from 'file-saver';
import {MemoryHistory} from 'history';
import {Pages} from '../Pages';

export default function IndexMenu(props: {history: MemoryHistory}): JSX.Element {
    const {t} = useTranslation('indexMenu');
    if (navigator.platform === 'iPad') {
        return (
            <>
                <CompoundButton
                    text="Import CSV"
                    secondaryText="Import a CSV file to your workbook."
                    onClick={() => props.history.push(Pages.import)}
                />
                <br /><br />
                <CompoundButton
                    text="Export CSV"
                    secondaryText="Export the current worksheet to a CSV file."
                    onClick={() => props.history.push(Pages.export)}
                />
                <br /><br />
                <CompoundButton text="File test" onClick={onClick}/>
            </>
        );
    } else {
        // If platform is not iPad, this page should not be shown.
        return <div>IndexMenu</div>
    }
}

function onClick() {
    const blob = new Blob(["saved text"], {type: 'text/csv'});
    FileSaver.saveAs(blob, 'file.csv');
}