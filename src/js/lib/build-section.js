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

module.exports = createSection;