import React from "react"
import { FAChevronDown, IoIosMenu, FaSearch } from 'react-icons/all'
import MdEject from 'react-icons/md'
class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const { chats, activeChat, user, setActiveChat, logout } = this.props
        return (<div id="side-bar">
            <div className="heading"></div>
            <div className="chatter-app">Chatter-APP</div>
            <div className="menu" >
                <IoIosMenu />
            </div>
            <div
                className="users"
                ref='users'
                onClick={(e) => { (e.target === this.refs.user) && setActiveChat(null) }}>
                {
                    chats.map((chat) => {
                        if (chat.name) {
                            const lastMessage = chat.message[chat.message.length - 1]
                            const user = chat.user.find(({ name }) => {
                                return name !== this.props.name
                            }) || { name: "Community" }
                            const classNames = (activeChat && activeChat.id === chat.id) ? 'active' : ''
                            return (
                                <div
                                    key={chat.id}
                                    className={`user ${classNames}`}
                                    onClick={() => { setActiveChat(chat) }}
                                >
                                    <div className="user-photo">{user.name[0].toUpperCase()}</div>
                                    <div className="user-info">
                                        <div className="name"> {user.name} </div>
                                        {lastMessage && <div className="last-messaege">{lastMessage.message}</div>}
                                    </div>
                                </div>
                            )
                        }
                        return null;
                    })
                }
            </div>
            <div className="current-user">
                <span>{user.name}</span>
                <div onClick={() => { logout() }} className="logout"></div>
            </div>
        </div>
        )
    }
}
export default SideBar