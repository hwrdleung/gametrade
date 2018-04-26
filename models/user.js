const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    first: {type: String },
    last: {type: String },
    username: {type: String },
    email: {type: String },
    password: {type: String },
});

var user = module.exports = mongoose.model('User', UserSchema);