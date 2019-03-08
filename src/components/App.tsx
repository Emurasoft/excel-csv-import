import * as React from 'react';

export class App extends React.Component<{}> {
    public render() {
        return (
            <>
                <input type="file" /><br /><br />
                <input placeholder="Delimiter" /><br /><br />
                <label>
                    Newline sequence:<br />
                    <select>
                        <option>LF</option>
                        <option>CRLF</option>
                    </select>
                </label><br /><br />
                <input placeholder="encoding" /><br /><br />
                <button>Import</button>
            </>
        )
    }
}