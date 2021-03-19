// Importing the necessary packages
const express = require('express');
const mongoose = require("mongoose");
const config = require('config');

// Connect Mongoose 
const uri = `mongodb+srv://${config.get("mongo").username}:${config.get("mongo").password}@sandbox.vlco9.mongodb.net/playground?retryWrites=true&w=majority`;
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect(uri)
    .then(() => console.log("Connected to the MongoDB"))
    .catch(err => console.log(`Couldn't establish a connection: ${err.message}`));

// Creating the express app and allowing it to use json
const app = express();
const rooms = require('./routes/rooms.js');
const home = require('./routes/home.js');

// Applying the middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // key=value&key=value

app.use('/api/rooms', rooms);
app.use('/', home);

// Starting the app and listening to it at a port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});