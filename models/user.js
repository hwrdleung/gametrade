const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    first: {type: String },
    last: {type: String },
    username: {type: String },
    email: {type: String },
    city: {type: String },
    state: {type: String },
    country: {type: String },
    password: {type: String },
    games: {type: Array}
});

var user = module.exports = mongoose.model('User', UserSchema);