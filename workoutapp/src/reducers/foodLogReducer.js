import * as constants from '../constants/index.js'

// let initialState = {
//     foods:
//         [{
//             name: 'overnight oats',
//             calories: 400
//         }]
// }

export const foodLogReducer = (state = {foods: [], mealType: 'lunch'}, action) => {

    switch (action.type) {
        // case constants.FIND_ALL_FOODS:
        //     newState = Object.assign({}, state)
        //     newState.foods = action.foods
        //     return newState

        case constants.ADD_FOOD_ITEM:
            let foodName;

            if (action.name === '') {
                foodName = "New Food"
            } else {
                foodName = action.name;
            }

            return {
                foods: [...state.foods,
                    {
                        name: foodName,
                        calories: action.calories
                    }
                ]
            }
        default:
            return state
    }
};


