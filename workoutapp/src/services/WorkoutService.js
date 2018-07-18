const WORKOUT_API_URL =
    'http://localhost:4000/api/workout';

const FINDFORUSER_API_URL =
    'http://localhost:4000/api/UID/workout';

const REMOVE_WORKOUT_FROM_USER =
    'http://localhost:4000/api/UID/workout/WID';

let _singleton = Symbol();
export default class WorkoutService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    findAllWorkouts() {
        return fetch(
            WORKOUT_API_URL)
            .then(function (response) {
                return response.json();
            })
    }

    createWorkout(workout, userId) {
        return fetch(WORKOUT_API_URL + '/' + userId, {
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    deleteWorkout(userId, workout) {
        return fetch(REMOVE_WORKOUT_FROM_USER
            .replace('UID', userId)
            .replace('WID', workout), {
            method: 'DELETE'
        }).then(function(response) {
            return response.json();
        })
    }

    findWorkoutsForUser(userId) {
        return fetch(FINDFORUSER_API_URL.replace('UID', userId))
            .then(function (response) {
                return response.json();
            })
    }

    findWorkoutById(workoutId) {
        return fetch(WORKOUT_API_URL + '/' + workoutId)
            .then(function (response) {
                return response.json();
            })
    }


    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new WorkoutService(_singleton);
        return this[_singleton]
    }
}