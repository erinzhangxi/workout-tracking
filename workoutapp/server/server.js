var express = require('express')
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://admin1:admin1@ds123981.mlab.com:23981/workoutapp-db');

var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "http://localhost:4200");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


var session = require('express-session')
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(4000);