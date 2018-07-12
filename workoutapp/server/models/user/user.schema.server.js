var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    workouts: [],
    meals: [],
    weights: [
        {
            date: Date,
            weight: Number
        }
    ],
    age: Number,
    currentWeight: Number,
    profileURL: String
}, {collection: 'user'});

module.exports = userSchema;