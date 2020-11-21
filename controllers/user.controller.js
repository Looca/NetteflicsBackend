const User = require('../models/user.js');

module.exports = {
    // Create and Save a new Note
    create: (req, res) => {
        res.send('users');
    },

    // Retrieve and return all users from the database.
    findAll: (req, res) => {
        User.find()
            .then(users => {
                res.send(users);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving notes."
                });
            });
    },

    // Find a single user with a userId
    findOne: (req, res) => { s
        User.findById(req.params.userId)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: "Note not found with id " + req.params.userId
                    });
                }
                res.send(user);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Note not found with id " + req.params.userId
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving note with id " + req.params.userId
                });
            });
    },

    // Update a note identified by the noteId in the request
    update: (req, res) => {
        res.send('users');
    },

    // Delete a note with the specified noteId in the request
    delete: (req, res) => {
        res.send('users');
    }
}