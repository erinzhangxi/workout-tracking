var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    workouts: [String],
    meals: [String],
    weights: [
        {
            date: String,
            weight: Number
        }
    ],
    age: Number,
    currentWeight: Number,
    profileURL: String,
    height: String
}, {collection: 'user'});

module.exports = userSchema;