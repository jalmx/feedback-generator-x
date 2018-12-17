const local = require('./save-local');
const createSection = require('./build-section').createSection;

const add = (form) => {

    let savedData = local.loadDataSaved();

    if (form.id.endsWith('feedback')) {
        console.log('feedback');
    } else {

        const name = form.id.toString().replace('form-', '');
        const inputNewMessage = document.getElementById(name + '-new');
        const newMessage = inputNewMessage.value;

        if (newMessage.trim() === '') {
            alert('El campo no puede estar vacío!')
            return;
        }

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

module.exports = {
    add
}