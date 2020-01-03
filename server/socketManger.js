const io = require('./server')
const { VERIFY_USER, USER_CONNECTED, LOGOUT } = require('../client/src/events')
const { createUser, createMessage, createChat } = require('../client/src/factories')

const connectedUser = {}
module.exports = function (socket) {
    console.log('socket id :' + socket.id)

    //verify user 
    socket.on(VERIFY_USER, (nickname, callback) => {
        if (isUser(connectedUser, nickname)) {
            callback({ isUser: true, user: null })
        } else {
            callback({ isUser: false, user: createUser({ name: nickname }) })
        }
    })

}
//add user 
function addUser(userList, user) {
    let newList = Object.assign({}, userList)
    newList[user.name] = user;
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
    return username in userListl;
}