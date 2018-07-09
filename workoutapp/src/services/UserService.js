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
}

export default UserService;