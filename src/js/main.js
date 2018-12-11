const selectionContainer = require('./lib/section').getSelectRadio;
const getText = require('./lib/section').getText;
const selectionAvailable = require('./lib/section').selectionAvailable;
const checkboxChecked = require('./lib/section').checkboxChecked;
const phrases = require('./lib/phrases');
const build = require('./lib/build-message').buildMessage;
const addMessage = require('./lib/build-message').addMessage;
const readFeed = require('./lib/readFeed')

const name = document.getElementById('name-user');
const containerGreeting = document.getElementById('container-greeting');
const containerPhrase = document.getElementById('container-phrase');
const containerMessage = document.getElementById('textarea-message');
const containerGoodbye = document.getElementById('container-goodbye');
const containerSign = document.getElementById('container-sign');
const containerFeedback = document.getElementById('container-feedback');

let messageGreeting = selectionContainer(containerGreeting, phrases.greetings);
let messagePhrase = selectionContainer(containerPhrase, phrases.phrase);
let messageGoodbye = selectionContainer(containerGoodbye, phrases.goodbye);
const feeds = require('./lib/build-feedback').createAllFeeds

containerFeedback.innerHTML += feeds()

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
    let active = true;
    if (event.target.dataset.input === 'checkbox' && event.target.type === 'checkbox') {
        active = selectionAvailable(event.target, containerGreeting);
    }

    bodyMessage.greeting = checkboxChecked(containerGreeting) && active ? selectionContainer(containerGreeting, phrases.greetings) : "";
    addMessage(containerMessage, bodyMessage);

});

containerPhrase.addEventListener('click', (event) => {
    let active = true;
    if (event.target.dataset.input === 'checkbox' && event.target.type === 'checkbox') {
        active = selectionAvailable(event.target, containerPhrase);
    }

    bodyMessage.phrase = checkboxChecked(containerPhrase) && active ? selectionContainer(containerPhrase, phrases.phrase) : "";
    addMessage(containerMessage, bodyMessage);

});

containerGoodbye.addEventListener('click', (event) => {
    let active = true;
    if (event.target.dataset.input === 'checkbox' && event.target.type === 'checkbox') {
        active = selectionAvailable(event.target, containerGoodbye);
    }

    bodyMessage.goodbye = checkboxChecked(containerGoodbye) && active ?
        selectionContainer(containerGoodbye, phrases.goodbye) : "";
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
    bodyMessage.feedbackOk = readFeed(event, containerFeedback).feedbackOk;
    bodyMessage.feedbackOpportunity = readFeed(event, containerFeedback).feedbackOpportunity;
    addMessage(containerMessage, bodyMessage);
})

