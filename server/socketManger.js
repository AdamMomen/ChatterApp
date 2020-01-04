const io = require('./server').io
const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED,
    LOGOUT, COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT,
    TYPING } = require('../client/src/events')
const { createUser, createMessage, createChat } = require('../client/src/factories')
var connectedUsers = {};
module.exports = (socket) => {
    console.log(`a user is connected  socket id : ${socket.id}`)

    //verify user 
    socket.on(VERIFY_USER, (nickname, callback) => {

        if (isUser(connectedUsers, nickname)) {
            callback({ isUser: true, user: null })
        } else {
            callback({ isUser: false, user: createUser({ name: nickname }) })
        }
        console.log()
    })

    socket.on(USER_CONNECTED, (user) => {
        // console.log('connectedUser', connectedUsers)
        console.log(user)
        connectedUsers = addUser(connectedUsers, user)
        socket.user = user;
        console.log('io', io)
        io.emit(USER_CONNECTED, connectedUsers)
        console.log('connected Users = ', connectedUsers)
    })

    //add user 
    function addUser(userList, user) {
        var newList = Object.assign({}, userList)
        var username = user.name;
        newList[username] = user;
        return newList

    }

    //remove user 
    function removeUser(userList, username) {
        let newList = Object.assign({}, userList)
        delete newList[username]
        return newList
    }

    //check user 
    function isUser(userList, username) {
        return username in userList;
    }
}
