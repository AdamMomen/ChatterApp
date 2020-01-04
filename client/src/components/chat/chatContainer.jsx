import React from "react"
import SideBar from './sideBar.jsx'
import Messages from "../messages.jsx";
class ChatContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            activeChat: null
        }
        this.setActiveChat = this.setActiveChat.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.sendTyping = this.sendTyping.bind(this)
        this.resetChat = this.resetChat.bind(this)
    }
    componentDidMount() {
        const { socket } = this.props
        socket.emit(COMMUNITY_CHAT, this.resetChat)
    }
    resetChat(chat) {
        return this.addChat(chat, true)
    }
    addChat(chat, reset) {
        const { socket } = this.props
        const { chats } = this.state
        const newChat = reset ? [chat] : [...chats, chat]
        this.setState({ chats: newChat })
        //check the spelling
        const messageEvent = `${MESSAGE_RECIEVED}-${chat - id -}`
        const typingEvent = `${TYPING}-${chat - id -}`

        socket.on(typingEvent)
        socket.on(messageEvent)

    }
    setActiveChat(activeChat) {
        this.setState({ activeChat })
    }
    addMessage
    sendMessage(chatId, message) {
        const { socket } = this.props
        socket.emit(MESSAGE_SENT, { chatId, message })
    }
    sendTyping() {
        const { socket } = this.props
        socket.emit(TYPING, { chatId, isTyping })

    }
    render() {
        const { user, logout } = this.props
        const { chats, activeChat } = this.state
        return (<div className="container">
            <SideBar
                logout={logout}
                chats={chats}
                user={user}
                activeChat={activeChat}
                setActiveChat={this.setActiveChat}
            />
            <div className="chat-room-container">
                {
                    activeChat !== null ? (
                        <div className="chat-room">
                            <chatHeading name={activeChat.name} />
                            <Message
                                message={activeChat.message}
                                user={user}
                                typingUsers={activeChat.typingUsers} />
                            <MessageInput
                                sendMessage={(message) => { this.sendMessage(activeChat.id, message) }}
                                sendTyping={(typing) => { this.sendTyping(activeChat.id, isTyping) }}
                            />
                        </div>
                    )
                }
            </div>
        </div>)
    }
}
export default ChatContainer