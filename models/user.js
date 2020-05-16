const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        // lowercase: true
    },
    surname: {
        type: String,
        required: true,
        trim: true,
        // lowercase: true
    },
    permissions: []
});

const User = mongoose.model("User", UserSchema);
module.exports = User;