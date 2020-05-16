const express = require('express');
const userModel = require('../models/user');
const app = express();

app.get('/', (req, res) => {
    res.send('Ciao Sandra guarda come mi diverto!')
  });

app.get('/users', async (req, res) => {
    const users = await userModel.find({});

    try {
        res.send(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = app