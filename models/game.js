const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
    title: { type:String },
    cover: { type:String },
    owner: { type:String },
    platform: {type: String },
    available: {type: Boolean}
});

var user = module.exports = mongoose.model('Game', GameSchema);