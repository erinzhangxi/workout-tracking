module.exports = function (app) {
    app.get('/api/workout', findAllWorkouts);

    var workoutModel = require('../models/workout/workout.model.server');


    function findAllWorkouts(req, res) {
        workoutModel.findAllWorkouts()
            .then(function (workouts) {
                res.send(workouts);
            })
    }

}
