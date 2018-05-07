const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    first: {type: String },
    last: {type: String },
    username: {type: String, unique: true },
    email: {type: String, unique: true},
    city: {type: String },
    state: {type: String },
    country: {type: String },
    password: {type: String },
    games: {type: Array},
    incoming: {type:Array},
    outgoing: {type:Array},
    active: {type:Array},
    history: {type:Array},

});

var user = module.exports = mongoose.model('User', UserSchema);