const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

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
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    roles: []
}, { timestamps: true });

UserSchema.plugin(passportLocalMongoose);
// module.exports = mongoose.model('User', UserSchema, 'users');
const UserDetail = mongoose.model('User', UserSchema, 'users');
passport.use(UserDetail.createStrategy());

passport.serializeUser(UserDetail.serializeUser());
passport.deserializeUser(UserDetail.deserializeUser());

module.exports = UserDetail;