const WORKOUT_API_URL =
    'http://localhost:4000/api/workout';

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


    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new WorkoutService(_singleton);
        return this[_singleton]
    }
}