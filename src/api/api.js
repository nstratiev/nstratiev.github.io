const host = 'http://localhost:3030';

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
};

export async function request(url, options) {
    try {
        const res = await fetch(host + url, options);

        if (res.ok !== true) {

            if (res.status === 403) {
                sessionStorage.removeItem('userData');
            }

            const error = await res.json();
            throw new Error(error.message);
        }

        if (res.status === 204) {
            sessionStorage.removeItem('userData');
            return res;
        } else {
            return res.json();
        }

    } catch (err) {
        alert(err.message);
        throw err;
    }
}

function createOptions(method, data) {
    const options = {
        method,
        headers: {}
    };

    if (data !== undefined) {
        options.headers['Content-Type'] = 'appication/json';
        options.body = JSON.stringify(data);
    }

    const userData = sessionStorage.getItem('userData');
    if (userData !== null) {
        options.headers['X-Authorization'] = JSON.parse(userData).accessToken;
    }

    return options;
}

export async function get(url) {
    return request(url, createOptions('GET'));
}

export async function post(url, data) {
    return request(url, createOptions('POST', data));
}

export async function put(url, data) {
    return request(url, createOptions('PUT', data));
}

export async function del(url) {
    return request(url, createOptions('DELETE'));
}

// Login, Register, Logout
export async function login(obj) {
    const serverRes = await post(endpoints.login, obj);

    sessionStorage.setItem('userData', JSON.stringify(serverRes));
}

export async function register(obj) {
    const serverRes = await post(endpoints.register, obj);

    sessionStorage.setItem('userData', JSON.stringify(serverRes));
}

export async function logout() {
    const res = await get(endpoints.logout);

    console.log(res);

    sessionStorage.removeItem('userData');
}
