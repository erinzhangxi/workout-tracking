var mongoose = require('mongoose');

var mealSchema = mongoose.Schema({
    food: [String],
    totalCalories: Number,
    type: String,
    date: Date
}, {collection: 'meal'});

module.exports = mealSchema;