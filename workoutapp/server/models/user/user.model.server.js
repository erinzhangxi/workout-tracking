var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function findUserByCredentials(credentials) {
    return userModel.findOne(credentials);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function createUser(user) {
    return userModel.create(user);
}

function findAllUsers() {
    return userModel.find();
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function deleteUser(userId) {
    return userModel.deleteOne({_id:userId});
}

function updateUser(userId, newUser) {
    return userModel.update({_id: userId}, {$set:newUser});
}

function addWorkoutToUser(userId, workoutId) {
    return userModel.update(
        {_id: userId},
        { $push: {workouts: workoutId}}
    );
}

function addMealToUser(userId, mealId) {
    return userModel.update(
        {_id: userId},
        { $push: {meals: mealId}}
    );
}

function addWeightToUser(userId, weight) {
    return userModel.update(
        {_id: userId},
        { $push: {weights: weight}}
    );
}

var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    findUserByCredentials: findUserByCredentials,
    findUserByUsername: findUserByUsername,
    deleteUser: deleteUser,
    updateUser: updateUser,
    addWorkoutToUser: addWorkoutToUser,
    addMealToUser: addMealToUser,
    addWeightToUser: addWeightToUser
};

module.exports = api;