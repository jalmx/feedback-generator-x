const local = require('./save-local');
const createSection = require('./build-section').createSection;
const createFormSign = require('./build-section').createFormSign;
const isEmptyError = require('./lib').isEmptyError;

const add = (form, elementName) => {
    let savedData = local.loadDataSaved();

    if (form.id.endsWith('feedback')) {
        console.log('feedback');
    } else {
        const name = form.id.toString().replace('form-', '');
        const inputNewMessage = document.getElementById(name + '-new') ||
            document.getElementById(elementName + '-new');
        const newMessage = inputNewMessage.value;

        if (isEmptyError(inputNewMessage)) {
            alert('El campo no puede estar vacío!');
            return;
        }

        if (name === 'sign') {
            savedData.phrases[name][elementName.toLowerCase()] = newMessage;
            local.insertValues(savedData)
            createFormSign({
                container: form,
                name: name,
                phrases: savedData.phrases[name],
                type: 'checkbox'
            })
        } else {
            savedData.phrases[name].push(newMessage);
            local.insertValues(savedData)
            createSection({
                container: form,
                name: name,
                phrases: savedData.phrases[name],
                type: name != 'resource' ? 'radio' : 'checkbox'
            })
        }

    }
}

module.exports = {
    add
}