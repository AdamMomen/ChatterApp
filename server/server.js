var express = require('express')
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', () => {
    console.log('a user is connected')
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('client/dist'))

var port = process.env.PORT || 3000

app.get('/messages', (req, res) => {
    console.log(req.method)
    res.json({ success: true })
})
app.post('/message', (req, res) => {
    io.emit('message', req.body.message)
    res.sendStatus(200)
})

var server = http.listen(port, () => {
    console.log('server is running on port', server.address().port);
});