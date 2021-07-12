// Importing the necessary packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

// Connect Mongoose
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@sandbox.vlco9.mongodb.net/playground?retryWrites=true&w=majority`;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

mongoose
	.connect(uri)
	.then(() => console.log('Connected to the MongoDB'))
	.catch((err) =>
		console.log(`Couldn't establish a connection: ${err.message}`)
	);

// Creating the express app and allowing it to use json
const app = express();
const rooms = require('./routes/rooms.js').router;
const home = require('./routes/home.js');

// Applying the middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // key=value&key=value
const morgan = require('morgan');
app.use(morgan('tiny'));
app.use(cors());

app.use('/api/rooms', rooms);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/dist'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
	});
}

// Starting the app and listening to it at a port
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening at port ${port}`);
});

// Connecting to the discord client and signing in
const client = require('./routes/rooms.js').client;
client.login(process.env.BOT_SECRET);
client.on('ready', () => {
	console.log('Discord Client is listening!');
});

const moderatorClient = require('./discord/moderator');
moderatorClient.login(process.env.BOT_SECRET);

const managerClient = require('./discord/manager');
managerClient.login(process.env.BOT_SECRET);

// Prevent heroku from sleeping
var http = require('http');
setInterval(function () {
	http.get('http://makepals.herokuapp.com');
}, 1000 * 60 * 15); // every 2 hours

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
	mongoose.connection.close(function () {
		console.log('Mongoose disconnected on app termination');
		process.exit(0);
	});
});
