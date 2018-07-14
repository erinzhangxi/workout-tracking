import * as constants from "../constants/index"

// export const findAllFoods= (dispatch, mealId) => {
//     fetch('http://localhost:4000/api/meal/MID').replace('MID', mealId)
//         .then(response => (response.json()))
//         .then(meal => dispatch({
//             type: constants.FIND_ALL_FOODS,
//             foods: meal.foods }))
// }

export const addFoodItem = (dispatch, foodName, calories) => (
    dispatch({type: constants.ADD_FOOD_ITEM, name: foodName, calories: calories})
)
//
// export const setFoodName = (dispatch, foodName) => (
//     dispatch({type: constants.SET_FOOD_NAME, name: foodName})
// )
//
// export const setFoodCalories = (dispatch, calories) => (
//     dispatch({type: constants.SET_FOOD_CALORIES, calories: calories})
// )