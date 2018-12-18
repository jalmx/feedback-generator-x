const key = require('./id')

const createAccount = () => {
    let values;
    if (window.localStorage.getItem(key)) {
        values = loadDataSaved();
    } else {
        values = insertValuesDefault();
    }
    return values;
}

const insertValuesDefault = () => {
    const phrases = require('./phrases');
    const feedbacks = require('./feedback');
    const values = JSON.stringify({
        phrases,
        feedbacks
    })
    window.localStorage.setItem(key, values);

    return { phrases, feedbacks };
}

const insertValues = data => {
    const values = JSON.stringify(data)
    window.localStorage.setItem(key, values);
}
const loadDataSaved = () => JSON.parse(window.localStorage.getItem(key));

const remove = (namePhrase, element) => {

    if (namePhrase != 'feedback') {
        let data = loadDataSaved();
        const index = data.phrases[namePhrase].indexOf(element)
        if (index >= 0) {
            data.phrases[namePhrase].splice(index, 1);
            insertValues(data);
        }
    } else {
        //TODO: en caso que sea feedback
    }
}
const reset = () => {
    window.localStorage.clear();
    insertValuesDefault()
}
module.exports = {
    createAccount,
    loadDataSaved,
    insertValues,
    reset,
    remove
}