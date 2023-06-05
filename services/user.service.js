import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));
const userCapabilities = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('capabilities')));

export const userService = {
    user: userSubject.asObservable(),
    capabilities: userCapabilities.asObservable(),
    get userValue () { return userSubject.value },
    get userCapabilities () { return userCapabilities.value },
    login,
    validate2fa,
    logout,
    register,
    getCapabilities,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(username, password) {
    return fetchWrapper.post(`${baseUrl}/authenticate`, { username, password })
        .then(user => {
            return user;
        });
}

function validate2fa(username, code) {
    return fetchWrapper.post(`${baseUrl}/validate2fa`, { username, code })
        .then(user => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));
            getCapabilities(username);

            return user;
        });
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/account/login');
}

function getCapabilities(username) {
    return fetchWrapper.get(`${baseUrl}/capabilities?username=${username}`)
        .then(capabilities => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            // userSubject.next(user);
            localStorage.setItem('capabilities', JSON.stringify(capabilities));

            return capabilities;
        });
}

function register(user) {
    return fetchWrapper.post(`${baseUrl}/register`, user);
}

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(x => {
            // update stored user if the logged in user updated their own record
            if (id === userSubject.value.id) {
                // update local storage
                const user = { ...userSubject.value, ...params };
                localStorage.setItem('user', JSON.stringify(user));

                // publish updated user to subscribers
                userSubject.next(user);
            }
            return x;
        });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
