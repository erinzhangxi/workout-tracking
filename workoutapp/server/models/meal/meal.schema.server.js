var mongoose = require('mongoose');

var mealSchema = mongoose.Schema({
    foods: [
        {
            name: String,
            calories: Number
        }
    ],
    type: String,
    date: Date
}, {collection: 'meal'});

module.exports = mealSchema;