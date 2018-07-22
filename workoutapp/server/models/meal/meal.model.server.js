var mongoose = require('mongoose');
var mealSchema = require('./meal.schema.server');
var mealModel = mongoose.model('MealModel', mealSchema);

function findAllMeals() {
    return mealModel.find();
}

function findMealById(mealId) {
    return mealModel.findById(mealId);
}

function createMeal(meal, userId) {
    return mealModel.create(meal);
}

function deleteMeal(mealId) {
    return mealModel.deleteOne({_id:mealId});
}

function updateMeal(mealId, newMeal) {
    return mealModel.update({_id: mealId}, {$set:newMeal});
}

function findAllFoodsForMeal(mealId) {
    return mealModel.find({_id: mealId}, {foods: true});
}


var api = {
    findAllMeals: findAllMeals,
    createMeal: createMeal,
    findMealById: findMealById,
    deleteMeal: deleteMeal,
    updateMeal: updateMeal,
    findAllFoodsForMeal: findAllFoodsForMeal

};

module.exports = api;