const express = require('express');
const app = express();
const mongoose = require("mongoose");
//引入users.js
const users = require("./routes/api/users");


//DB config
const db = require("./config/keys").mongoURI;
// connect to mongodb
mongoose.connect(db,{ useNewUrlParser: true })
    .then((client) => {
        console.log("MongoDB Connected");
    })
    .catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send(db);
})

app.use('/api/users',users)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})