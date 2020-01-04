import React from "react"

class ChatContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            activeChat: null
        }
        this.setActiveChat = this.setActiveChat.bind(this)
    }
    setActiveChat(activeChat) {
        this.setState({ activeChat })
    }
    render() {
        const { user, logout } = this.props
        return (<div className="container">
            <sideBar
                logout={logout}
                chats={chats}
                user={user}
                activeChat={activeChat}
                setActiveChat={this.setActiveChat}

            ></sideBar>
        </div>)
    }
}
export default ChatContainer