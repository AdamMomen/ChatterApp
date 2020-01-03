var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('client/dist'))
var port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening to port ${port}`);
})