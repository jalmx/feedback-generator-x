(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var selectionContainer = require('./lib/section').getSelectRadio;

var getSign = require('./lib/section').getSign;

var selectionAvailable = require('./lib/section').selectionAvailable;

var checkboxChecked = require('./lib/section').checkboxChecked;

var build = require('./lib/build-message').buildMessage;

var addMessage = require('./lib/build-message').addMessage;

var readFeed = require('./lib/readFeed');

var local = require('./lib/save-local');

var add = require('./lib/add').add;

var name = document.getElementById('name-user');
var containerGreeting = document.getElementById('container-greeting');
var containerPhrase = document.getElementById('container-phrase');
var containerMessage = document.getElementById('textarea-message');
var containerGoodbye = document.getElementById('container-goodbye');
var containerSign = document.getElementById('container-sign');
var containerFeedback = document.getElementById('container-feedback'); // TODO: crear el codigo para los recursos

var containerResources = document.getElementById('container-resources');
var formGreeting = document.getElementById('form-greeting');
var formPhrase = document.getElementById('form-phrase');
var formGoodbye = document.getElementById('form-goodbye');
var formResource = document.getElementById('form-resource');
var formSign = document.getElementById('form-sign');
local.createAccount();

var createView = function createView() {
  var createSection = require('./lib/build-section').createSection;

  var createFormSign = require('./lib/build-section').createFormSign;

  var phrases = local.loadDataSaved().phrases;
  createSection({
    container: formGreeting,
    name: 'greeting',
    phrases: phrases.greeting,
    type: 'radio'
  });
  createSection({
    container: formPhrase,
    name: 'phrase',
    phrases: phrases.phrase,
    type: 'radio'
  });
  createSection({
    container: formGoodbye,
    name: 'goodbye',
    phrases: phrases.goodbye,
    type: 'radio'
  });
  createSection({
    container: formResource,
    name: 'resource',
    phrases: phrases.resource,
    type: 'checkbox'
  });
  createFormSign({
    container: formSign,
    name: 'sign',
    'phrases': phrases.sign,
    type: 'checkbox'
  });
};

createView();
var phrases = local.loadDataSaved().phrases;
var messageGreeting = selectionContainer(containerGreeting, phrases.greeting);
var messagePhrase = selectionContainer(containerPhrase, phrases.phrase);
var messageGoodbye = selectionContainer(containerGoodbye, phrases.goodbye);
var messageSign = getSign(containerSign, phrases.sign);

var feeds = require('./lib/build-feedback').createAllFeeds;

containerFeedback.innerHTML += feeds(local.loadDataSaved().feedbacks);
var bodyMessage = {
  name: name.value,
  greeting: messageGreeting,
  phrase: messagePhrase,
  feedbackOk: [],
  feedbackOpportunity: [],
  goodbye: messageGoodbye,
  sign: messageSign
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
  if (event.target.id.endsWith('add')) {
    event.preventDefault();
    add(formGreeting);
  }

  if (event.target.localName === 'span') {
    var element = event.target.parentElement.children[0].textContent.trim();
    local.remove(event.target.parentElement.parentElement.id.toString().replace('form-', '').trim(), element);
    createView();
  }

  var active = true;

  if (event.target.dataset.input === 'checkbox' && event.target.type === 'checkbox') {
    active = selectionAvailable(event.target, containerGreeting);
  }

  bodyMessage.greeting = checkboxChecked(containerGreeting) && active ? selectionContainer(containerGreeting, local.loadDataSaved().phrases.greeting) : '';
  addMessage(containerMessage, bodyMessage);
});
containerPhrase.addEventListener('click', function (event) {
  if (event.target.id.endsWith('add')) {
    event.preventDefault();
    add(formPhrase);
  }

  if (event.target.localName === 'span') {
    var element = event.target.parentElement.children[0].textContent.trim();
    local.remove(event.target.parentElement.parentElement.id.toString().replace('form-', '').trim(), element);
    createView();
  }

  var active = true;

  if (event.target.dataset.input === 'checkbox' && event.target.type === 'checkbox') {
    active = selectionAvailable(event.target, containerPhrase);
  }

  bodyMessage.phrase = checkboxChecked(containerPhrase) && active ? selectionContainer(containerPhrase, local.loadDataSaved().phrases.phrase) : "";
  addMessage(containerMessage, bodyMessage);
});
containerGoodbye.addEventListener('click', function (event) {
  if (event.target.id.endsWith('add')) {
    event.preventDefault();
    add(formGoodbye);
  }

  if (event.target.localName === 'span') {
    var element = event.target.parentElement.children[0].textContent.trim();
    local.remove(event.target.parentElement.parentElement.id.toString().replace('form-', '').trim(), element);
    createView();
  }

  var active = true;

  if (event.target.dataset.input === 'checkbox' && event.target.type === 'checkbox') {
    active = selectionAvailable(event.target, containerGoodbye);
  }

  bodyMessage.goodbye = checkboxChecked(containerGoodbye) && active ? selectionContainer(containerGoodbye, local.loadDataSaved().phrases.goodbye) : "";
  addMessage(containerMessage, bodyMessage);
});
containerSign.addEventListener('click', function (event) {
  if (event.target.id.endsWith('add')) {
    event.preventDefault();
    add(formSign, event.target.id.toString().replace('-add', ''));
  }

  if (event.target.id === 'erase') {
    local.remove(event.target.parentElement.parentElement.id.toString().replace('form-', '').trim(), event.target.parentElement.children[2].dataset.sign.toString().toLowerCase());
    createView();
  }

  var active = true;

  if (event.target.dataset.input === 'checkbox' && event.target.type === 'checkbox') {
    active = selectionAvailable(event.target, containerSign);
  }

  bodyMessage.sign = checkboxChecked(containerSign) && active ? getSign(containerSign, phrases.sign) : "";
  addMessage(containerMessage, bodyMessage);
});
containerFeedback.addEventListener('click', function (event) {
  if (event.target.id.endsWith('add')) {
    event.preventDefault();
    add(containerPhrase);
  }

  bodyMessage.feedbackOk = readFeed(event, containerFeedback).feedbackOk;
  bodyMessage.feedbackOpportunity = readFeed(event, containerFeedback).feedbackOpportunity;
  addMessage(containerMessage, bodyMessage);
});

require('./lib/btn').reset();

require('./lib/btn').clear();

require('./lib/btn').copyToClipboard();

require('./lib/btn').saveData(); // TODO: arreglar la parte de eliminar de la firma
// TODO: arreglar el de agregar y eliminar de feedback
},{"./lib/add":3,"./lib/btn":4,"./lib/build-feedback":5,"./lib/build-message":6,"./lib/build-section":7,"./lib/readFeed":11,"./lib/save-local":12,"./lib/section":13}],2:[function(require,module,exports){
module.exports = class Feed {

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
const local = require('./save-local');
const createSection = require('./build-section').createSection;
const createFormSign = require('./build-section').createFormSign;

const add = (form, elementName) => {
    let savedData = local.loadDataSaved();

    if (form.id.endsWith('feedback')) {
        console.log('feedback');
    } else {
        const name = form.id.toString().replace('form-', '');
        const inputNewMessage = document.getElementById(name + '-new') ||
            document.getElementById(elementName + '-new');
        const newMessage = inputNewMessage.value;

        if (newMessage.trim() === '') {
            alert('El campo no puede estar vacío!')
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
},{"./build-section":7,"./save-local":12}],4:[function(require,module,exports){
const reset = () => {
    const local = require('./save-local');
    document.getElementById('reset')
        .addEventListener('click', e => {
            e.preventDefault();
            local.reset();
            window.location.reload();
        });

}

const clear = () => {
    document.getElementById('clear')
        .addEventListener('click', e => {
            e.preventDefault();
            window.location.reload();
        });
}

const saveData = () => {
    document.getElementById('save')
        .addEventListener('click', e => {
            e.preventDefault();
            const textarea = document.getElementById('textarea-message');
            const saved = document.getElementById('message-saved');
            let message = saved.innerText;

            saved.innerText = '';
            saved.innerText += textarea.value + '\n-------------------------\n' + message + "\n";
        })
}

const copyToClipboard = () => {
    const copy = document.getElementById('copy');
    copy.addEventListener('click', e => {
        e.preventDefault();
        const textarea = document.getElementById('textarea-message');
        textarea.select();
        document.execCommand('copy');
    })
}
module.exports = {
    reset,
    clear,
    saveData,
    copyToClipboard
}
},{"./save-local":12}],5:[function(require,module,exports){
const createAllFeeds = (feedbacks) => {
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
},{}],6:[function(require,module,exports){

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
},{}],7:[function(require,module,exports){
const createSection = (values) => {

    const container = values.container;
    const name = values.name;
    const phrases = values.phrases;
    const type = values.type;

    phrases.unshift('ramdom');

    let elements = '';

    phrases.forEach((item, i) => {
        elements += /*html*/ `
        <div class="option">
            <label>
              <input type="${type}" name="${toIdHTML(name)}" id="${toIdHTML(name) + "-" + toIdHTML(item)}" ${i === 0 ? 'checked' : ''}/> ${item}
            </label>
            ${i != 0 ? '<span class="erase">X</span>' : ''}
        </div>
        `
    });

    container.innerHTML = '';
    container.innerHTML += elements;
    container.appendChild(createSectionAddNew(name));

    return container;
}

const createFormSign = values => {
    const container = values.container;
    const name = values.name;
    const phrases = values.phrases;
    const type = values.type;
    let html = '';

    html += createOption('Nombre', type, phrases.nombre, name);
    html += createOption('Cargo', type, phrases.cargo, name);
    html += createOption('Grupo', type, phrases.grupo, name);
    container.innerHTML = html;
    return container;
}

const createOption = (name, type, data, nameForm) => {
    return data === '' ?
        /*html*/ `
<div class="option new-data active">
    <input type="${type}" id="${nameForm}-${name}" checked/>
    <label for="${nameForm}-${name}">${name}</label>
    <input type="text" id="${name}-new" placeholder="${name}" />
    <span class="button" id="${name}-add" >Agregar<span>
</div>
        ` :
/*html*/ `
<div class="option new-data active">
    <input type="${type}" id="${nameForm}-${name}" checked/>
    <label for="${nameForm}-${name}">${name}</label>
    <label for="${nameForm}-${name}" data-sign="${name}" data-option="true">${data}</label>
    <span class="erase" id="erase">X</span>
</div>
        `;
}

const createSectionAddNew = (name) => {
    let div = document.createElement('div');
    div.classList.add("option", "new-data");

    let label = document.createElement('label');
    label.setAttribute('for', toIdHTML(name) + "-new");
    label.innerText = 'Nuevo'

    let a = document.createElement('a');
    a.classList.add('button');
    a.id = name + "-add";
    a.href = "#";
    a.textContent = "Agregar"

    div.appendChild(label)
    div.appendChild(createInput('text', name))
    div.appendChild(a)

    return div;
}

const createInput = (type, name) => {
    let input = document.createElement('input');
    input.type = type;
    input.name = toIdHTML(name);
    input.id = toIdHTML(name) + "-new";
    return input;
}

/**
 * Evita que los id salgan con espacios y con letras con acentos
 * @param {*} text 
 */
const toIdHTML = (text) => text.split(" ").join("-")
    .split(",").join("")
    .split("á").join("")
    .split("é").join("")
    .split("í").join("")
    .split("ó").join("")
    .split("ú").join("")

module.exports = { createSection, createFormSign };
},{}],8:[function(require,module,exports){
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
},{"./Feed":2}],9:[function(require,module,exports){
module.exports = 'EF0D391237';
},{}],10:[function(require,module,exports){
const greeting = ['Hola', 'Estimado', 'Buen día'];
const greetingTime = ['Buenos días', 'Buenas tardes', 'Buenas noches'];
// TODO: agregar que verifuqe la hora y me lanze la que deba ir de acuerdo al horario


const phrase = [
    'Haz realizado un excelente trabajo, continia de esta manera',
    "Se percibe tu motivación y en ello tu esfuerzo, seguimos trabajando de esta manera."
];

const goodbye = [
    'Saludos',
    "Saludos cordiales",
    'Un caluroso abrazo',
    'Saludos, cualquier duda estoy a tus órdenes.'
];

const resource = [
    'Link a sesión síncrona',
    'La RAE'
]

const sign = {
    cargo: '',
    grupo: '',
    nombre: ''
}
module.exports = {
    greeting,
    phrase,
    goodbye,
    greetingTime,
    resource,
    sign
}
},{}],11:[function(require,module,exports){
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
},{"./feedback":8,"./section":13}],12:[function(require,module,exports){
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
},{"./feedback":8,"./id":9,"./phrases":10}],13:[function(require,module,exports){
const getSelectRadio = (container = new HTMLElement, phrases = []) => {
    const options = [...container.querySelectorAll('[type="radio"]')];

    if (options.length > 0) {

        if (options[0].checked) return randomPhrase(phrases);

        for (let i = 1; i < phrases.length + 1; i++) {
            if (options[i].checked) return phrases[i - 1];
        }
    }
    return null;
}

/**
 * obtiene lo seleccionado desde la UI
 */
const getSign = (container = new HTMLElement, phrases) => {

    const labels = [...container.querySelectorAll('label')];

    let sign = '';

    labels.filter(
        label => {
            sign += label.dataset.option === "true" && label.previousElementSibling.previousElementSibling.checked ?
                label.textContent + "\n" : '';
        }
    )

    return sign;
}

const randomPhrase = (phrases = []) => {
    return phrases.length > 0 ? phrases[Math.floor(Math.random() * phrases.length)] : '';
}

/**
 * Activa y desactiva los elementos en el container
 */
const selectionAvailable = (checkbox, container = new HTMLElement) => {
    const options = [...container.querySelectorAll('[type="radio"]')];
    const text = [...container.querySelectorAll('[type="text"]')];
    const checkboxChilds = [...container.querySelectorAll('[type="checkbox"]')];
    const ranges = [...container.querySelectorAll('[type="range"]')];

    options.forEach((i) => {
        i.disabled = !checkbox.checked;
    });

    text.forEach((i) => {
        i.disabled = !checkbox.checked;
    });
    ranges.forEach((i) => {
        i.disabled = !checkbox.checked;
    });
    for (let index = 1; index < checkboxChilds.length; index++) {
        checkboxChilds[index].disabled = !checkbox.checked;
    }


    return checkbox.checked;
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
    getSign
}
},{}]},{},[1])