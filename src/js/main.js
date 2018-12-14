const selectionContainer = require('./lib/section').getSelectRadio;
const getText = require('./lib/section').getText;
const selectionAvailable = require('./lib/section').selectionAvailable;
const checkboxChecked = require('./lib/section').checkboxChecked;
const build = require('./lib/build-message').buildMessage;
const addMessage = require('./lib/build-message').addMessage;
const readFeed = require('./lib/readFeed')
const local = require('./lib/save-local');
const add = require('./lib/add').add;

const name = document.getElementById('name-user');
const containerGreeting = document.getElementById('container-greeting');
const containerPhrase = document.getElementById('container-phrase');
const containerMessage = document.getElementById('textarea-message');
const containerGoodbye = document.getElementById('container-goodbye');
const containerSign = document.getElementById('container-sign');
const containerFeedback = document.getElementById('container-feedback');
const containerResources = document.getElementById('container-resources');
const formGreeting = document.getElementById('form-greeting');
const formPhrase = document.getElementById('form-phrase');
const formGoodbye = document.getElementById('form-goodbye');
const formResource = document.getElementById('form-resource');


const saved = local.createAccount();
const phrases = saved.phrases;
const feeds = require('./lib/build-feedback').createAllFeeds

const createView = () => {
    const createSection = require('./lib/build-section')
    createSection({ container: formGreeting, name: 'greeting', phrases: phrases.greeting, type: 'radio' });
    createSection({ container: formPhrase, name: 'phrase', phrases: phrases.phrase, type: 'radio' });
    createSection({ container: formGoodbye, name: 'goodbye', phrases: phrases.goodbye, type: 'radio' });
    createSection({ container: formResource, name: 'resource', phrases: phrases.resource, type: 'checkbox' });
}
createView();

let messageGreeting = selectionContainer(containerGreeting, phrases.greeting);
let messagePhrase = selectionContainer(containerPhrase, phrases.phrase);
let messageGoodbye = selectionContainer(containerGoodbye, phrases.goodbye);

containerFeedback.innerHTML += feeds(saved.feedbacks)

let bodyMessage = {
    name: name.value,
    greeting: messageGreeting,
    phrase: messagePhrase,
    feedbackOk: [],
    feedbackOpportunity: [],
    goodbye: messageGoodbye,
    sign: ""
};
containerMessage.value = build(bodyMessage);

name.addEventListener('keyup', (event) => {
    bodyMessage.name = event.target.value;
    addMessage(containerMessage, bodyMessage);
})

containerSign.addEventListener('keyup', (event) => {
    bodyMessage.sign = event.target.value;
    addMessage(containerMessage, bodyMessage);
})

containerGreeting.addEventListener('click', (event) => {

    if ((event.target.id).endsWith('add')) {
        event.preventDefault()
        add(formGreeting)
    }

    if (event.target.localName === 'span') {
        //TODO: para eliminar el mensaje
        let elements = Array.from(containerGreeting.children);

        elements[elements.length - 1]
        console.dir(elements[elements.length - 1]);

    }

    let active = true;
    if (event.target.dataset.input === 'checkbox' && event.target.type === 'checkbox') {
        active = selectionAvailable(event.target, containerGreeting);
    }
    console.log('entre');

    bodyMessage.greeting = checkboxChecked(containerGreeting) && active ? selectionContainer(containerGreeting, local.loadDataSaved().phrases.greeting) : "";
    addMessage(containerMessage, bodyMessage);

});

containerPhrase.addEventListener('click', (event) => {


    if ((event.target.id).endsWith('add')) {
        event.preventDefault()
        add(formPhrase)
    }

    let active = true;
    if (event.target.dataset.input === 'checkbox' && event.target.type === 'checkbox') {
        active = selectionAvailable(event.target, containerPhrase);
    }

    bodyMessage.phrase = checkboxChecked(containerPhrase) && active ? selectionContainer(containerPhrase, local.loadDataSaved().phrases.phrase) : "";
    addMessage(containerMessage, bodyMessage);

});

containerGoodbye.addEventListener('click', (event) => {

    if ((event.target.id).endsWith('add')) {
        event.preventDefault()
        add(formGoodbye)
    }

    let active = true;
    if (event.target.dataset.input === 'checkbox' && event.target.type === 'checkbox') {
        active = selectionAvailable(event.target, containerGoodbye);
    }

    bodyMessage.goodbye = checkboxChecked(containerGoodbye) && active ?
        selectionContainer(containerGoodbye, local.loadDataSaved().phrases.goodbye) : "";
    addMessage(containerMessage, bodyMessage);

});

containerSign.addEventListener('click', (event) => {
    let active = true;
    if (event.target.dataset.input === 'checkbox' && event.target.type === 'checkbox') {
        active = selectionAvailable(event.target, containerSign);
    }
    bodyMessage.sign = checkboxChecked(containerSign) && active ?
        getText(containerSign, phrases.sign) : "";
    addMessage(containerMessage, bodyMessage);
});

containerFeedback.addEventListener('click', (event) => {

    if ((event.target.id).endsWith('add')) {
        event.preventDefault()
        add(containerPhrase)
    }

    bodyMessage.feedbackOk = readFeed(event, containerFeedback).feedbackOk;
    bodyMessage.feedbackOpportunity = readFeed(event, containerFeedback).feedbackOpportunity;
    addMessage(containerMessage, bodyMessage);
})

require('./lib/btn').reset();
require('./lib/btn').clear();
require('./lib/btn').copyToClipboard();
require('./lib/btn').saveData();
