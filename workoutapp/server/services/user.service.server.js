module.exports = function (app) {
    app.get('/api/user', findAllUsers);
    app.get('/api/user/:userId', findUserById);
    app.post('/api/user', createUser);
    app.get('/api/profile', profile);
    app.post('/api/logout', logout);
    app.post('/api/login', login);
    app.post('/api/register', register);
    app.delete('/api/user/:userId', deleteUser);
    app.put('/api/user/:userId', updateUser);


    var userModel = require('../models/user/user.model.server');

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }
    function findUserById(req, res) {
        var id = req.params['userId'];
        userModel.findUserById(id)
            .then(function (user) {
                res.json(user);
            })
    }
    // used for development purpose - postman
    function createUser(req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(function (user) {
                req.session['currentUser'] = user;
                res.send(user);
            })
    }
    function profile(req, res) {
        res.send(req.session['currentUser']);
    }


    function login(req, res) {
        var credentials = req.body;
        userModel
            .findUserByCredentials(credentials)
            .then(function(user) {
                if (user) {
                    req.session['currentUser'] = user;
                    res.send(user);
                } else {
                    res.sendStatus(404);
                }
            })
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    // used by production - users
    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var newUser = {
            username: username,
            password: password
        };
        userModel
            .findUserByUsername(username)
            .then(function(user) {
                if (!user) {
                    req.session['currentUser'] = user;
                    return userModel
                        .createUser(newUser)}});
    }

    function deleteUser(req, res) {
        var user = req.params['userId'];
        userModel.deleteUser(user)
            .then(function(error, user) {
                if (user === null) {
                    res.sendStatus(404);
                }
                else {
                    res.send(user);
                }
            })
    }

    function updateUser(req, res) {
        var user = req.body;
        userModel
            .updateUser(user._id, user)
            .then(function(response) {
                if (response === null) {
                    res.sendStatus(404);
                }
                else {
                    userModel
                        .findUserById(user._id)
                        .then(function(updatedUser) {
                            res.send(updatedUser);
                            // req.session['currentUser'] = user;
                        })
                }
            })
    }




}
