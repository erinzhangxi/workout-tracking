var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    time: String,
    duration: String,
    title: String,
    description: String,
    location: String,
    caloriesBurned: Number

}, {collection: 'workout'});

module.exports = userSchema;