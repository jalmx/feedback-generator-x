
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