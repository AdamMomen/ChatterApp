var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(''))
var port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening to port ${port}`);
})