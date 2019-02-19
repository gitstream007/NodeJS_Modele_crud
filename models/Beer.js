const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Beer = new Schema({
    name: String,
    rating: Number,
    type: String,
    brewery : String,
    tested : Boolean
});

module.exports = mongoose.model('Beer', Beer);