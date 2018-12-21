const isEmptyError = (input) => {

    if (input.value.trim() === '') {
        input.classList.add('error-input')
        return true;
    }
    else {
        input.classList.remove('error-input');
        return false
    }
}

module.exports = { isEmptyError }