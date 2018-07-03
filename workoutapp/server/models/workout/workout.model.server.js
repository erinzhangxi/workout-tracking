var mongoose = require('mongoose');
var workoutSchema = require('./workout.schema.server');
var workoutModel = mongoose.model('WorkoutModel', workoutSchema);


var api = {

};

module.exports = api;