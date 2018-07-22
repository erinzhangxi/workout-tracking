import * as constants from '../constants/index.js'
import moment from 'moment';

let initialState = {
    foods:
        [{
            name: 'overnight oats',
            calories: 400
        }]
}

export const foodLogReducer = (state = {foods: [], mealType: ''}, action) => {

    switch (action.type) {

        case constants.ADD_FOOD_ITEM:
            return {
                foods: [...state.foods,
                    {
                        name: action.name,
                        calories: action.calories
                    }
                ],
                mealType: state.mealType,
                currentFoodName: '',
                currentFoodCalories: ''
            }

        case constants.SUBMIT_MEAL:
            var now = moment(new Date()).format('YYYY MM DD');
            let meal = {
                foods: action.foods,
                type: action.mealType,
                date: now
            }
            fetch(('http://localhost:4000/api/meal/UID').replace('UID', action.userId), {
                method: 'post',
                body: JSON.stringify(meal),
                headers: {
                    'content-type': 'application/json'}
            })

            return state


        default:
            return state
    }
};


