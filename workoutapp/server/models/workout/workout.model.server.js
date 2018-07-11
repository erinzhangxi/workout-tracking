var mongoose = require('mongoose');
var workoutSchema = require('./workout.schema.server');
var workoutModel = mongoose.model('WorkoutModel', workoutSchema);

function findAllWorkouts() {
    return workoutModel.find();
}

function findWorkoutById(workoutId) {
    return workoutModel.findById(workoutId);
}

function createWorkout(workout, userId) {
    return workoutModel.create(workout);
}

function deleteWorkout(workoutId) {
    return workoutModel.deleteOne({_id:workoutId});
}

function updateWorkout(workoutId, newWorkout) {
    return workoutModel.update({_id: workoutId}, {$set:newWorkout});
}



var api = {
    findAllWorkouts: findAllWorkouts,
    createWorkout: createWorkout,
    findWorkoutById: findWorkoutById,
    deleteWorkout: deleteWorkout,
    updateWorkout: updateWorkout
};

module.exports = api;