const express = require("express")
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const config = require('./config.js');
const mongoose = require('mongoose');
const users = require('./routes/user');
const ads = require('./routes/ads');
const passport = require('passport');
require('./passport')(passport);
// DB Connection
mongoose
    .connect(config.dbConfig, {
        useNewUrlParser: true
    })
    .then(() => console.log("MONGO DB IS CONNECTED"))
    .catch((err) => console.log("MONGODB Failed to connect"));
// GET REQUEST /api
app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json({
    extended: false
}))
app.use("/api", users);
app.use("/api", ads);
app.listen(config.serverPort, () => console.log("Server runing on " + config.serverPort));