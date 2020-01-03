var express = require('express')
var bodyParser = require('body-parser')
var app = express()
// const socket = require('socketio')(8000);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('client/dist'))
var port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening to port ${port}`);
})