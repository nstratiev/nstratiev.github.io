import * as api from './api.js';

const endpoints = {
    catalog: '/data/albums?sortBy=_createdOn%20desc&distinct=name', // GET
    details: (itemId) => `/data/albums/${itemId}`, // GET
    create: '/data/albums', // POST
    update: (itemId) => `/data/albums/${itemId}`, // PUT
    delete: (itemId) => `/data/albums/${itemId}`, // DELETE
    search: (query) => `/data/albums?where=name%20LIKE%20%22${query}%22`
};

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// ###############################################
export async function getSearchResults(query) {
    return await api.get(endpoints.search(query));
}

// ###############################################
export async function getAllItems() {
    return await api.get(endpoints.catalog);
}

export async function getById(id) {
    return await api.get(endpoints.details(id));
}

export async function getProfile(userId) {
    return await api.get(endpoints.profile(userId));
}

export async function createItem(obj) {
    return await api.post(endpoints.create, obj);
}

export async function updateItem(id, obj) {
    return await api.put(endpoints.update(id), obj);
}

export async function deleteItem(id) {
    return await api.del(endpoints.delete(id));
}
