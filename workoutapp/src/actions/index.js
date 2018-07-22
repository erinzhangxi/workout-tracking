import * as constants from "../constants/index"

export const findAllFoodsForMeal= (dispatch, mealId) => {
    fetch('http://localhost:4000/api/meal/MID/food').replace('MID', mealId)
        .then(response => (response.json()))
        .then(foods => dispatch({
            type: constants.FIND_ALL_FOODS_FOR_MEAL,
            foods: foods }))
}

export const addFoodItem = (dispatch, foodName, calories) => (
    dispatch({type: constants.ADD_FOOD_ITEM, name: foodName, calories: calories})
)

export const submitMeal = (dispatch, foods, mealType, userId) => (
    dispatch({type: constants.SUBMIT_MEAL, foods: foods, mealType: mealType, userId: userId})
)
