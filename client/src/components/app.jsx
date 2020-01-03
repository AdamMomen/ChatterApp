import React from "react"
import ReactDOM from 'react-dom'
var io = require('socket.io-client')
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        var socket = io();
        socket.on('message', function (data) {
            //set the state though
            console.log(data);
        })
    }
    render() {
        return (
            <div>
                <div id="message-conntainer" style={{ height: "500px", width: "200px", border: "1px solid grey", "borderRadius": "10px" }}>
                    Messages should be rendered here!!
                </div>
                <form id="message-form">
                    <input type="text" />
                    <input type="submit" />
                </form>
            </div >
        )
    }
}
ReactDOM.render(<App />, document.getElementById('app'))