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
    let data = loadDataSaved();

    if (namePhrase === 'feedback') {
        // TODO: para feedback
    } else if (namePhrase === 'sign') {
        data.phrases.sign[element] = '';
    } else {
        //para todos los casos restantes
        const index = data.phrases[namePhrase].indexOf(element)
        if (index >= 0) {
            data.phrases[namePhrase].splice(index, 1);
        }
    }
    insertValues(data);
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