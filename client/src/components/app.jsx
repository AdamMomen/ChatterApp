import React from "react"
import ReactDOM from 'react-dom'
import Messages from './messages.jsx'
import { json } from "body-parser";
var $ = require('jquery');
var io = require('socket.io-client')
class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            message: '',
            messages: null,
        }
    }
    componentDidMount() {
        // var socket = io();
        // socket.on('message', (data) => {
        //     //set the state though
        //     this.setState({
        //         messages: data
        //     });
        // })
        // console.log('from socket', this.state.messages)
    }

    onChange(e) {
        this.setState({
            message: e.target.value,
        })

    }
    handleSubmit() {
        console.log(this.state.message)
        if (this.state.message) {

            var message = {
                message: this.state.message
            }
            $.post('http://localhost:3000/message', JSON.stringify(message))
            this.setState({
                message: ''
            })
        }
    }
    render() {
        return (
            <div>
                <div id="message-conntainer" style={{ height: "500px", width: "200px", border: "1px solid grey", "borderRadius": "10px" }}>
                    Messages should be rendered here!!
                </div>
                <input type="text" onChange={this.onChange} value={this.state.message}></input>
                <button onClick={this.handleSubmit}>Submit</button>
            </div >
            // <Messages
        )
    }
}
ReactDOM.render(<App />, document.getElementById('app'))