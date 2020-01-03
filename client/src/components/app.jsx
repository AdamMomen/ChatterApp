import React from "react"
import ReactDOM from 'react-dom'
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

            fetch('http://localhost:3000/message', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(message)
            }).then(console.log(`Sent successfully!`))
        }
        this.setState({
            message: ''
        })
    }
    render() {
        return (
            <div>
                <div id="message-conntainer" style={{ height: "500px", width: "200px", border: "1px solid grey", "borderRadius": "10px" }}>
                    Messages should be rendered here!!
                </div>
                {/* <form id="message-form" onSubmit={this.handleClick}> */}
                <input type="text" onChange={this.onChange} value={this.state.message}></input>
                <button onClick={this.handleSubmit}>Submit</button>
                {/* </form> */}
            </div >
        )
    }
}
ReactDOM.render(<App />, document.getElementById('app'))