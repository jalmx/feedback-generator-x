const addFeed = () => {
    const btnAdd = document.getElementById('btn-add-feed');
    const container = document.getElementById('add-feed-container');

    const eventsBtn = e => {
        if (e.target.id === 'feed-cancel') {
            clear()
        } else if (e.target.id === 'feed-save') {
            saveNewFeed();
        } else if (e.target.id === 'add-new-comment') {
            addOption()
        } else if (e.target.id === 'sub-new-comment') {
            subOption()
        }
    }
    const clear = () => {
        btnAdd.style.display = 'inline-block'
        container.style.display = "none"
        container.innerHTML = "";
    }
    const countInput = () => {
        return container.querySelectorAll('input').length;
    }

    const saveNewFeed = () => {
        const Feed = require('./Feed');
        const local = require('./save-local');
        const tag = document.getElementById('tag-feed');
        const containerInputs = document.getElementById('add-feed__description');
        const inputs = [...containerInputs.querySelectorAll('input[type="text')];
        let feeds = [];

        inputs.forEach(input => {
            feeds.push(input.value)
        })

        const newFeed = new Feed(tag.value, false, {
            group: 'new',
            range: feeds
        })

        local.saveNewFeed(newFeed);
        clear();
        const containerFeedback = document.getElementById('container-feeds');
        const buildFeeds = require('./build-feedback');
        containerFeedback.innerHTML = '';
        containerFeedback.innerHTML += buildFeeds(local.loadDataSaved().feedbacks);
        document.getElementById('textarea-message').value = '';
    }

    const addOption = () => {
        buildOption(`${countInput() - 1}`)
    }
    const subOption = () => {
        const containerInputs = document.getElementById('add-feed__description');
        if (containerInputs.childElementCount <= 2) {
            alert('Debe contener cuando menos 2 comentarios')
        } else {
            containerInputs.removeChild(containerInputs.lastElementChild);
        }
    }

    btnAdd.addEventListener('click', e => {
        e.preventDefault();

        container.addEventListener('click', eventsBtn);

        btnAdd.style.display = 'none'
        container.style.display = "block"

        container.innerHTML +=/*html*/ `
        <h3 class="add-feed__title">Agregar comentarios</h3>
        <div class="btn-group">
        <span class="button btn-feed sub-feed" id="sub-new-comment">-</span>
            <span class="button btn-feed" id="add-new-comment">+</span>
        </div>
        <div class="add-feed__input">
          <label for="tag">Tag</label>
          <input type="text" placeholder="Ejemplo: Formato" id="tag-feed"/>
        </div>
        <div class="add-feed__description" id="add-feed__description">
        </div>
        <div class="btn-save"><span class="button" id="feed-cancel">Cancelar</span><span class="button" id="feed-save">Guardar</span></div>
        `
        buildOption('0', 'No está en el formato solicitado el documento');
        buildOption('1', 'Entregas el documento en el formato solicitado.');
    });

    const buildOption = (value, placeholder = '') => {
        const inputContainer = document.getElementById('add-feed__description');
        let div = document.createElement('div');
        div.classList.add("add-feed__input");

        const label = document.createElement('label');
        label.textContent = `${value}`;
        label.setAttribute('for', `${value}eval`);

        const input = document.createElement('input');
        input.type = 'text';
        input.name = `${value}eval`;
        input.placeholder = placeholder === '' ? `${value} Nivel` : `Ejemplo: ${placeholder}`
        input.id = `${value}eval`;
        div.appendChild(label);
        div.appendChild(input)

        inputContainer.appendChild(div);
    }
}

module.exports = addFeed;