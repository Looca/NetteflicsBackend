const express = require('express');
const bodyParser = require('body-parser');
// Configuring the database
const dbConfig = require('./config/mongo.js');
const mongoose = require('mongoose');
const passport = require('passport');

const expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  });

// create express app
const app = express();


app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname));

// Require Routes
require('./routes/routes')(app);
// app.use('/api');

const LISTEN_PORT = process.env.PORT || 3000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(expressSession);

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
mongoose.set('useCreateIndex', true);
// listen for requests
app.listen(LISTEN_PORT, () => {
    console.log("Server is listening on port " + LISTEN_PORT);
});

// ARRIVATO FINO A Implementing Local Authentication https://www.sitepoint.com/local-authentication-using-passport-node-js/