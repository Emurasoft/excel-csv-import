import * as React from 'react';
import {Store} from '../Store';
import {connect} from '../connect';

interface State {
    file: File;
}

class App extends React.Component<{store: Store}, State> {
    public componentDidMount() {
        this.props.store.initParser();
    }

    public render() {
        return (
            <>
                <input type="file" accept="text/csv" onChange={this.fileInputHandler}/><br /><br />
                <input placeholder="Delimiter" /><br /><br />
                <label>
                    Newline sequence:<br />
                    <select>
                        <option>LF</option>
                        <option>CRLF</option>
                    </select>
                </label><br /><br />
                <input placeholder="encoding" /><br /><br />
                <button onClick={this.submitHandler}>Import</button><br /><br />
                <button onClick={() => console.log(this.props.store.actionList())}>Print log</button>
            </>
        )
    }

    private fileInputHandler = (event) => {
        this.setState({file:event.target.files[0]});
    }

    private submitHandler = () => {
        this.props.store.importFile(this.state.file, {});
    }
}

export default connect(App);