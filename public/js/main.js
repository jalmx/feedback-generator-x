(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var selectionContainer = require('./lib/section').getSelectRadio;

var getText = require('./lib/section').getText;

var selectionAvailable = require('./lib/section').selectionAvailable;

var checkboxChecked = require('./lib/section').checkboxChecked;

var phrases = require('./lib/phrases');

var build = require('./lib/build-message').buildMessage;

var addMessage = require('./lib/build-message').addMessage;

var readFeed = require('./lib/readFeed');

var name = document.getElementById('name-user');
var containerGreeting = document.getElementById('container-greeting');
var containerPhrase = document.getElementById('container-phrase');
var containerMessage = document.getElementById('textarea-message');
var containerGoodbye = document.getElementById('container-goodbye');
var containerSign = document.getElementById('container-sign');
var containerFeedback = document.getElementById('container-feedback');
var messageGreeting = selectionContainer(containerGreeting, phrases.greetings);
var messagePhrase = selectionContainer(containerPhrase, phrases.phrase);
var messageGoodbye = selectionContainer(containerGoodbye, phrases.goodbye);

var feeds = require('./lib/build-feedback').createAllFeeds;

containerFeedback.innerHTML += feeds();
var bodyMessage = {
  name: name.value,
  greeting: messageGreeting,
  phrase: messagePhrase,
  feedbackOk: [],
  feedbackOpportunity: [],
  goodbye: messageGoodbye,
  sign: ""
};
containerMessage.value = build(bodyMessage);
name.addEventListener('keyup', function (event) {
  bodyMessage.name = event.target.value;
  addMessage(containerMessage, bodyMessage);
});
containerSign.addEventListener('keyup', function (event) {
  bodyMessage.sign = event.target.value;
  addMessage(containerMessage, bodyMessage);
});
containerGreeting.addEventListener('click', function (event) {
  var active = true;

  if (event.target.dataset.input === 'checkbox' && event.target.type === 'checkbox') {
    active = selectionAvailable(event.target, containerGreeting);
  }

  bodyMessage.greeting = checkboxChecked(containerGreeting) && active ? selectionContainer(containerGreeting, phrases.greetings) : "";
  addMessage(containerMessage, bodyMessage);
});
containerPhrase.addEventListener('click', function (event) {
  var active = true;

  if (event.target.dataset.input === 'checkbox' && event.target.type === 'checkbox') {
    active = selectionAvailable(event.target, containerPhrase);
  }

  bodyMessage.phrase = checkboxChecked(containerPhrase) && active ? selectionContainer(containerPhrase, phrases.phrase) : "";
  addMessage(containerMessage, bodyMessage);
});
containerGoodbye.addEventListener('click', function (event) {
  var active = true;

  if (event.target.dataset.input === 'checkbox' && event.target.type === 'checkbox') {
    active = selectionAvailable(event.target, containerGoodbye);
  }

  bodyMessage.goodbye = checkboxChecked(containerGoodbye) && active ? selectionContainer(containerGoodbye, phrases.goodbye) : "";
  addMessage(containerMessage, bodyMessage);
});
containerSign.addEventListener('click', function (event) {
  var active = true;

  if (event.target.dataset.input === 'checkbox' && event.target.type === 'checkbox') {
    active = selectionAvailable(event.target, containerSign);
  }

  bodyMessage.sign = checkboxChecked(containerSign) && active ? getText(containerSign, phrases.sign) : "";
  addMessage(containerMessage, bodyMessage);
});
containerFeedback.addEventListener('click', function (event) {
  bodyMessage.feedbackOk = readFeed(event, containerFeedback).feedbackOk;
  bodyMessage.feedbackOpportunity = readFeed(event, containerFeedback).feedbackOpportunity;
  addMessage(containerMessage, bodyMessage);
});
},{"./lib/build-feedback":3,"./lib/build-message":4,"./lib/phrases":6,"./lib/readFeed":7,"./lib/section":8}],2:[function(require,module,exports){
module.exports = class feed {

    constructor(name = '', checked = false, data = {}) {
        this.name = name;
        this.data = data || {
            checked: checked,
            option: false,
            range: [],
            group: ''
        };
    }

}
},{}],3:[function(require,module,exports){
const feedbacks = require('./feedback');

const createAllFeeds = () => {
    let feeds = "";

    feedbacks.forEach((element) => {

        let options = "";
        for (let i = 0; i < element.data.range.length; i++) {
            let value = setRange(element.data.range.length) * i;
            options += /*html*/ `<option value="${value}" label="${value}%"></option>`
        }

        feeds += /*html*/ `
            <div class="option">
            <label>
              <input type="checkbox" name="${toIdHTML(element.name)}" id="${toIdHTML(element.name)}"/> ${element.name}
            </label>
            <div class="slider">
            <input type="range" 
            step="${ setRange(element.data.range.length)}" 
            min="0" 
            max="${setRange(element.data.range.length) * (element.data.range.length - 1)}" 
            value="${setRange(element.data.range.length) * (element.data.range.length - 1)}" 
            list="list-${toIdHTML(element.name)}"
            />
              <datalist id="list-${toIdHTML(element.name)}">
                ${options}
               </datalist>
            </div>
          </div>
            `
    })

    return feeds;
};

const toIdHTML = (text) => {
    return text.split(" ").join("-");
}

const setRange = (value) => {
    return (100 / (value - 1)).toFixed(2)
}
module.exports = {
    createAllFeeds
}
},{"./feedback":5}],4:[function(require,module,exports){

const buildMessage = (message = {}) => {

    let feedback = "", feedbackOpportunity = "";

    if (message.feedbackOk.length > 0) {
        for (const feed of message.feedbackOk) {
            feedback += feed + " ";
        }
        feedback += "\n";
    }

    if (message.feedbackOpportunity.length > 0) {
        feedbackOpportunity = 'Como área de oportunidad te sugiero '
        for (const opportunity of message.feedbackOpportunity) {
            feedbackOpportunity += opportunity + " ";
        }
        feedbackOpportunity += "\n";
    }
    return cleanMessage(
        message.greeting + " " + message.name,
        feedback,
        feedbackOpportunity,
        message.phrase,
        message.goodbye,
        message.sign
    );
}

const addMessage = (container, message) => {
    container.value = buildMessage(message);
}

const cleanMessage = (...text) => {
    let message = ""

    for (let index = 0; index < text.length; index++) {

        if (text[index] !== "")
            message += text[index] + "\n"
    }

    return message;
}

module.exports = {
    buildMessage,
    addMessage
}
},{}],5:[function(require,module,exports){
let Feed = require('./Feed')

const identify = new Feed('identifica el problema', false, {
    group: 'cognitive',
    range: [
        'Realizar un anális más detallado y cuidadoso con respecto al problema planteado.',
        'Identificas y planteas la fórmula que lo ayudará a resolver el problema, pero no está correctamente presentada. Por lo tanto, contines inconsistencias en los resultados planteados.',
        'Identificas y planteas la fórmula que lo ayudará a resolver el problema.'
    ]
})

const tecnology = new Feed('emplea la tecnología', false, {
    group: 'attitudinal',
    range: [
        'Existen diversos softwares y aplicaciones las cuales puedes hacer uso, las cuales te permiter entregar un excelente trabajo; partiendo de ello, el módelo educativo nos marca que desarrollemos la competencia del uso y aplicación de las tecnologías de la información',
        'Empleas la tecnología de la forma adecuada para elaborar un documento con la información solicitada.',
    ]
})

const time = new Feed('entrega a tiempo', false, {
    group: 'attitudinal',
    range: [
        'Entregar en los tiempos establecidos para que no sea afectada tu evaluación.',
        'Cumples con los tiempos estipulados de entrega de la actividad.'
    ]
})

const attitudinal = new Feed('atiende indicaciones', false, {
    group: 'attitudinal',
    range: [
        'Atender las indicaciones que se otorgan en la plataforma, de esta manera puedes cubrir el 100% de cuestionamientos.',
        'Atiendes en un 60 % a las indicaciones para entregar la actividad',
        'Atiendes en un 70 % a las indicaciones para entregar la actividad.',
        'Atiendes en un 80 % a las indicaciones para entregar la actividad',
        'Atiendes en un 90 % a las indicaciones para entregar la actividad.',
        'Atiendes a las indicaciones para entregar la actividad.'
    ]
})

const clean = new Feed('limpio y ordenado', false, {
    group: 'communicative',
    range: [
        'La presentación es poco organizada y en algunos momentos se dificulta la comprensión; puedes tomarte un tiempo y desarrollarla con cuidado y ordenado.',
        'Expones de manera clara tus ideas. La forma en la que presentas la información facilita la lectura y comprensión.'
    ]
})

const orthography = new Feed('redacción y orotografía', false, {
    group: 'communicative',
    range: [
        'Hacer uso del autocorrector ortografico de Word y apoyarte en la RAE(http://rea.es) cuando desconozcas el significado de alguna palabra',
        'Presentas de 5 a 6 errores en las reglas de redacción, sintaxis, ortografía o puntuación.',
        'Presentas de 3 a 4 errores en las reglas de redacción, sintaxis, ortografía o puntuación.',
        'Presentas de 1 a 2 errores en las reglas de redacción, sintaxis, ortografía o puntuación.',
        'Cuentas con una bunea redacción, sintaxis, ortografía y puntuación.'
    ]
})

const information = new Feed('información correcta y pertinente', false, {
    group: 'communicative',
    range: [
        'Realizar una investigación más a profundidad y analitica al respesto al tema.',
        'Realizar una investigación más a profundidad ya que existen inconsistencias en algunas cuestiones.',
        'La información que presentas, así como los procedimientos, son pertinentes y corresponden a los elementos solicitados.'
    ]
})

const critico = new Feed('crítico', false, {
    group: 'thinking',
    range: [
        'Realiza un análisis superficial que no le permite resolver correctamente la actividad.',
        'Analizas de manera general la información para identificar la forma en la que resolverá el planteamiento.',
        'Analizas la información para identificar la forma en la que resolverá el planteamiento.',
        'Analizas de manera general la información, para identificar la forma en la que resolverá el planteamiento.',
        'Analizas la información para identificar la forma en la que resolverá el planteamiento.'
    ]
})

const reflex = new Feed('reflexiona', false, {
    group: 'thinking',
    range: [
        'Reflexionar con la forma adecuada de aplicacr métodos algebraicos.',
        'Reflexionas de forma regular y utilizas de manera incorrecta métodos algebraicos para resolver el problema planteado.',
        'Reflexionas y utilizas métodos algebraicos para resolver el problema planteado.'
    ]
})

const nomenclature = new Feed('nomenclatura correcta', false, {
    group: 'attitudinal',
    range: [
        'Atender la nomenclatura correcta del documento.',
        'Atiendes la nomenclatura solicitada al documento.'
    ]
})

const format = new Feed('formato', false, {
    group: 'attitudinal',
    range: [
        'No está en el formato solicitado el documento',
        'Entregas el documento en el formato solicitado.'
    ]
})
// falta agregar trabajo limpio y ordenado --> digital
//Formato solicitado ---> redactar

module.exports = [
    // analyze, //rehacer********
    identify,
    reflex,
    tecnology,
    attitudinal,
    orthography,
    critico,
    time,
    clean,
    information,
    nomenclature,
    format
];
},{"./Feed":2}],6:[function(require,module,exports){
const greetings = ['Hola', 'Estimado', 'Buenas tardes', 'Buen día', 'Buenos días'];// este array se pasara por parametros

const phrase = [
    'Haz realizado un excelente trabajo, continia de esta manera', 
    "Se percibe tu motivación y en ello tu esfuerzo, seguimos trabajando de esta manera.",
    "Se percibe tu motivación y en ello tu esfuerzo, seguimos trabajando de esta manera."
];

const goodbye = [
    'Saludos', 
    "Saludos cordiales",
     'Un caluroso abrazo',
     'Saludos, cualquier duda estoy a tus órdenes.',
     'Saludos, cualquier duda estoy a tus órdenes.'
    ];

module.exports = {
    greetings,
    phrase,
    goodbye
}
},{}],7:[function(require,module,exports){
const arrayFeeds = require('./feedback')
const selectionAvailable = require('./section').selectionAvailable;

module.exports = function (event, containerFeedback) {

    if (event.target.dataset.input === 'checkbox' && event.target.type === 'checkbox') {
        selectionAvailable(event.target, containerFeedback);
    }

    let feedbackOk = [];
    let feedbackOpportunity = [];
    let range = event.target;

    let ranges = [...range.parentNode.parentNode.parentNode.querySelectorAll('input[type="range"]')];

    ranges.forEach((range, index) => {
        if (range.parentNode.previousElementSibling.children[0].checked) {
            let level = range.value / range.step;

            if(level === 0){
                feedbackOpportunity.push(arrayFeeds[index].data.range[level])
            }else{
                feedbackOk.push(arrayFeeds[index].data.range[level])
            }
        }
    })
    return {feedbackOk, feedbackOpportunity}
}
},{"./feedback":5,"./section":8}],8:[function(require,module,exports){

const getSelectRadio = (container = new HTMLElement, phrases = []) => {
    const options = [...container.querySelectorAll('[type="radio"]')];

    if (options.length > 0) {

        if (options[0].checked) return randomPhrase(phrases);

        for (let i = 1; i < phrases.length; i++) {
            if (i > 0) if (options[i].checked) return phrases[i - 1];
        }
    }
    return "";
}

const getText = (container = new HTMLElement) => {
    const textArea = container.querySelector('textarea');
    return textArea.value;
}

const randomPhrase = (phrases = []) => {
    return phrases[Math.floor(Math.random() * phrases.length)];
}

const selectionAvailable = (checkbox, container = new HTMLElement) => {
    const options = [...container.querySelectorAll('[type="radio"]')];
    const textareas = [...container.querySelectorAll('textarea')];
    const checkboxChilds = [...container.querySelectorAll('[type="checkbox"]')];
    const ranges = [...container.querySelectorAll('[type="range"]')];

    options.forEach((i) => {
        i.disabled = !checkbox.checked;
    });

    textareas.forEach((i) => {
        i.disabled = !checkbox.checked;
    });
    ranges.forEach((i)=>{
        i.disabled = !checkbox.checked;
    });
    for (let index = 1; index < checkboxChilds.length; index++) {
        checkboxChilds[index].disabled = !checkbox.checked;
    }
    

    return checkbox.checked;
}

const getValueRange = (container = new HTMLElement) => {
    const range = container.querySelector('[type="range"]')
    console.log(range.value);
    //**LLAMAR AL READ FEED E */
}

/**
 * Obtiene el primer checkbox del container
 */
const checkboxChecked = (container) => {
    const checkbox = container.querySelector('[type="checkbox"]');
    return checkbox.checked;
}

module.exports = {
    getSelectRadio,
    selectionAvailable,
    checkboxChecked,
    getText,
    getValueRange
}
},{}]},{},[1])