var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    workouts: [],
    meals: [
        {
            food: String,
            calories: Number
        }
    ],
    weights: [
        {
            date: Date,
            weight: Number
        }
    ],
    age: Number,
    currentWeight: Number
}, {collection: 'user'});

module.exports = userSchema;