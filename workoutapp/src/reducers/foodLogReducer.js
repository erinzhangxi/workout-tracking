import * as constants from '../constants/index.js'

let initialState = {
    foods:
        [{
            name: 'overnight oats',
            calories: 400
        }]
}

export const foodLogReducer = (state = {foods: [], mealType: 'lunch'}, action) => {

    switch (action.type) {

        case constants.ADD_FOOD_ITEM:
            console.log(action.name);
            console.log(action.calories);

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

        // case constants.SET_FOOD_NAME:
        //     console.log(action.name);
        //     return {
        //         foods: state.foods,
        //         mealType: state.mealType,
        //         currentFoodName: action.name,
        //         currentFoodCalories: state.calories
        //     }
        //
        // case constants.SET_FOOD_CALORIES:
        //     console.log(action.calories);
        //     return {
        //         foods: state.foods,
        //         mealType: state.mealType,
        //         currentFoodName: state.name,
        //         currentFoodCalories: action.calories
        //     }

        default:
            return state
    }
};


