var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport')
var app = express();
//引入users.js
var users = require('./routes/api/users');

//DB config
var db = require('./config/keys').mongoURI;

// connect to mongodb
mongoose.connect(db,{ useNewUrlParser: true })
    .then((client) => {
        console.log('MongoDB Connected');
    })
    .catch(err => console.log(err))

// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// passport初始化
app.use(passport.initialize())
require('./config/passport')(passport);

app.get('/', (req, res) => {
    res.send(db);
})

app.use('/api/users',users)

var port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})