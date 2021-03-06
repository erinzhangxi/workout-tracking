module.exports = function (app) {
    app.get('/api/meal', findAllMeals);
    app.post('/api/meal/:userId', createMeal);
    app.get('/api/:userId/meal', findMealsForUser);
    app.get('/api/meal/:mealId', findMealById);
    app.delete('/api/:userId/meal/:mealId', deleteMeal);
    app.get('/api/meal/:mealId/food', findAllFoodsForMeal);

    var mealModel = require('../models/meal/meal.model.server');
    var userModel = require('../models/user/user.model.server');

    function findAllMeals(req, res) {
        mealModel.findAllMeals()
            .then(function (meals) {
                res.send(meals);
            })
    }

    function findAllFoodsForMeal(req, res) {
        var mealId = req.params['mealId'];
        mealModel.findAllFoodsForMeal(mealId)
            .then(function (foods) {
                res.send(foods);
            })
    }

    function createMeal(req, res) {
        var meal = req.body;
        var id = req.params['userId'];

        var mealId;
        mealModel
            .createMeal(meal, id)
            .then(function (meal) {
                mealId = meal._id;

                console.log('meal ID ' + mealId);
                userModel.addMealToUser(id, mealId)
                    .then(function (user) {
                        res.send(user);
                    })
            })

    }
    function findMealById(req, res) {
        var id = req.params['mealId'];
        mealModel
            .findMealById(id)
            .then(function (meal) {
                res.send(meal);
            })
    }

    function findMealsForUser(req, res) {
        var id = req.params['userId'];
        userModel
            .findUserById(id)
            .then(function (user) {
                res.send(user.meals);
            })
    }

    function deleteMeal(req, res) {
        var meal = req.params['mealId'];
        var id = req.params['userId'];

        userModel.removeMealFromUser(id, meal)
            .then(function(user) {
                return mealModel.deleteMeal(meal)
                    .then(function (meal) {
                        res.send(meal);

                    })
            })
    }

}
