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
    const btnAdd = [...container.querySelectorAll('[id*="-add"]')];
    const btnErase = [...container.querySelectorAll('[id*="-erase"]')];

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

    btnAdd.forEach(btn => {
        btn.classList.toggle('btn-inactive');
    })

    btnErase.forEach(btn => {
        btn.classList.toggle('erase');
        btn.classList.toggle('btn-inactive');
    })

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