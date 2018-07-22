const MEAL_API_URL =
    'http://localhost:4000/api/meal';

const FIND_USER_MEAL =
    'http://localhost:4000/api/UID/meal';

const REMOVE_MEAL_FROM_USER =
    'http://localhost:4000/api/UID/meal/MID';

let _singleton = Symbol();
export default class WorkoutService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    findAllMeals() {
        return fetch(
            MEAL_API_URL)
            .then(function (response) {
                return response.json();
            })
    }

    findMealsForUser(userId) {
        return fetch(FIND_USER_MEAL.replace('UID', userId))
            .then(function (response) {
                return response.json();
            })
    }

    findMealById(mealId) {
        return fetch(MEAL_API_URL + '/' + mealId)
            .then(function (response) {
                return response.json();
            })
    }

    deleteMeal(userId, mealId) {
        return fetch(REMOVE_MEAL_FROM_USER
            .replace('UID', userId)
            .replace('MID', mealId), {
            method: 'DELETE'
        }).then(function(response) {
            return response.json();
        })
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new WorkoutService(_singleton);
        return this[_singleton]
    }
}