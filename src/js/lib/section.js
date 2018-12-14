
const getSelectRadio = (container = new HTMLElement, phrases = []) => {
    const options = [...container.querySelectorAll('[type="radio"]')];
    console.log(phrases);

    if (options.length > 0) {

        if (options[0].checked) return randomPhrase(phrases);

        for (let i = 1; i < phrases.length + 1; i++) {
            if (options[i].checked) {
                console.log(i);
                console.log(i - 1);

                return phrases[i - 1];
            }
        }
    }
    return null;
}

const getText = (container = new HTMLElement) => {
    const textArea = container.querySelector('textarea');
    return textArea.value;
}

const randomPhrase = (phrases = []) => {
    let i = 0;

    while (i === 0) {
        i = Math.floor(Math.random() * phrases.length) > 0 ? Math.floor(Math.random() * phrases.length) : 0;
    }
    return phrases[i];
}

/**
 * Activa y desactiva los elementos en el container
 */
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
    getText
}