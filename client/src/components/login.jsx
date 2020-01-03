import React from 'react'
import { VERIFY_USER } from '../events'
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            error: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        this.setState({
            nickname: e.target.value
        })
    }
    handleSubmit(e) {
        e.preventDeafault();
        const { socket } = this.props
        const { nickname } = this.state
        socket.emit(VERIFY_USER, nickname, this.setUser)

    }
    setUser({ user, isUser }) {
        console.log(user, isUser)
        if (isUser) {
            this.setError("")
        } else {
            this.props.setUser()
        }
    }

    render() {
        const { nickname, error } = this.state;
        return (
            <div className="login">
                <label htmlFor="nickname"><h2>Got a nickname</h2></label>
                <form>
                    <input
                        ref={(input) => {
                            this.textInput = input
                        }}
                        type="text"
                        id="nickname"
                        value={nickname}
                        onChange={this.handleChange}
                        placeholder={'World Leader'}
                    />
                    <input
                        type="submit"

                    />
                    <div className="error">{error ? error : null}</div>
                </form></div>
        )
    }
}
export default Login
