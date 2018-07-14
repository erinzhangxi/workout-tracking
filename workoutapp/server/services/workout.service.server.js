module.exports = function (app) {
    app.get('/api/workout', findAllWorkouts);
    app.post('/api/workout/:userId', createWorkout);
    app.get('/api/:userId/workout', findWorkoutsForUser);
    app.get('/api/workout/:workoutId', findWorkoutById);

    var workoutModel = require('../models/workout/workout.model.server');
    var userModel = require('../models/user/user.model.server');

    function findAllWorkouts(req, res) {
        workoutModel.findAllWorkouts()
            .then(function (workouts) {
                res.send(workouts);
            })
    }

    function createWorkout(req, res) {
        var workout = req.body;
        var id = req.params['userId'];

        var workoutId;
        workoutModel
            .createWorkout(workout, id)
            .then(function (workout) {
                res.send(workout);
                workoutId = workout._id;

                userModel.addWorkoutToUser(id, workoutId)
                    .then(function (user) {
                        res.send(user);
                    })
            })

    }
    function findWorkoutById(req, res) {
        var id = req.params['workoutId'];
        workoutModel
            .findWorkoutById(id)
            .then(function (workout) {
                res.send(workout);
            })
    }

    function findWorkoutsForUser(req, res) {
        var id = req.params['userId'];
        userModel
            .findUserById(id)
            .then(function (user) {
                res.send(user.workouts);
            })
    }

}
