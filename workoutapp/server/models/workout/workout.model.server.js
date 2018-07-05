var mongoose = require('mongoose');
var workoutSchema = require('./workout.schema.server');
var workoutModel = mongoose.model('WorkoutModel', workoutSchema);

function findAllWorkouts() {
    return workoutModel.find();
}


var api = {
    findAllWorkouts: findAllWorkouts
};

module.exports = api;