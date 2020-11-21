const express = require('express');
// const mongoConfig = require('./config/mongo');
var mongoose = require('mongoose');
const router = require('./routes/routes.js');
const bodyParser = require('body-parser');
const LISTEN_PORT = '3000'
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Set up default mongoose connection
var mongoDB = 'mongodb+srv://LukeFartwalker:$007007$@lukecluster-4bjri.mongodb.net/netteflics-dev?retryWrites=true&w=majority';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {
    console.log('------------ CONNESSO ------------')
});

app.use('/api', router);

app.listen(LISTEN_PORT, () => { console.log('Server is running @ port ' + LISTEN_PORT) });