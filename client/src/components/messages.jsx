import React, { useRef } from "react"
import ReactDOM from 'react-dom'
import { USER_CONNECTED, LOGOUT } from '../events'
import Login from './login.jsx';
import ChatContainer from './chatContainer.jsx';
// import { useEffect, useRef } from "react"
// import io from 'socket.io-client'
var io = require('socket.io-client')
var socketURL = 'http://localhost:3000'

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            messages: null,
            socket: null,
            user: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.setUser = this.setUser.bind(this)
        this.logout = this.setUser.bind(this)
        this.setError = this.setUser.bind(this)
    }

    componentDidMount() {
        var socket = io().on('connect', () => {
            console.log('connected!')
        })
        this.setState({ socket: socket })
        console.log(socket)
    }
    setUser(user) {

        const { socket } = this.state

        socket.emit(USER_CONNECTED, user)
        this.setState({ user })
        console.log('insoide setState', this.state.user)
    }
    logout() {
        const { socket } = this.state
        socket.emit(LOGOUT)
        this.setState({ user: null })
    }
    onChange(e) {
        this.setState({
            message: e.target.value,
        })

    }
    setError(error) {
        this.setState({ error })
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
        const { socket, user } = this.state
        const { title } = this.props
        return (
            <div>
                <div id="message-conntainer">
                    {
                        !user ?
                            <Login socket={socket} setUser={this.setUser} />
                            :
                            <ChatContainer socket={socket} user={user} logout={this.logout} />
                    }
                </div>
            </div >
        )
    }
}
export default Messages