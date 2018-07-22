import moment from 'moment';

let _singleton = Symbol();
const USER_API_URL =
    'http://localhost:4000/api/user';

class UserService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new UserService(_singleton);
        return this[_singleton]
    }
    findAllUsers() {
        return fetch(USER_API_URL)
            .then(function(response){
                return response.json();
            });
    }
    createUser(user) {
        return fetch(USER_API_URL, {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })}

    login(user) {
        return fetch('http://localhost:4000/api/login', {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(response => {
                if (response.status === 404) {
                    alert('Login credentials incorrect')
                } else {
                    return response.json()
                }
            })
    }
    updateUser(userId, user) {
        return fetch('http://localhost:4000/api/user/UID'.replace('UID', userId), {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        }).then(function (response) {
            return response.json();
        })
    }

    findUserById(userId) {
        return fetch(USER_API_URL + '/' + userId)
            .then(function(response){
                return response.json();
            });
    }

    addWeightToUser(userId, weight) {
        var now = moment().format("MMM Do YY");
        return fetch('http://localhost:4000/api/user/UID/weight'.replace('UID', userId), {
            body: JSON.stringify({
                date: now,
                weight: weight
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    removeWeightFromUser(userId, weightId) {
        return fetch('http://localhost:4000/api/user/UID/weight/WID'
            .replace('UID', userId)
            .replace('WID', weightId), {
            method: 'DELETE'
        }).then(function (response) {
            return response.json();
        })
    }
}

export default UserService;