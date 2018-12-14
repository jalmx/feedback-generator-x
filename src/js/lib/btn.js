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