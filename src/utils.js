export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

export function setUserData(dataObj) {
    sessionStorage.setItem('userData', JSON.stringify(dataObj));
}

export function removeUserData() {
    sessionStorage.removeItem('userData');
}

// ###################################################

export function ownerValidation(data) {
    if (getUserData() !== null) {
        const userId = getUserData()._id;
        const ownerId = data._ownerId;

        return ownerId === userId;
    } else {
        return false;
    }
}

export function isOwner(userData, itemObj) {
    return userData && userData._id === item._ownerId;
}

// ###################################################

export function hasEmptyField(formData) {
    const bool = Array.from(formData.values())
        .map(m => m.trim())
        .some(s => s === '');

    return bool;
}

export function formDataToObject(formData) {
    const obj = {};

    Array.from(formData.entries()).forEach(el => {
        obj[el[0]] = el[1].trim();
    });

    return obj;
}
