

const addFeed = () => {
    const btnAdd = document.getElementById('btn-add-feed');
    const container = document.getElementById('add-feed-container');

    const eventsBtn = e => {
        if (e.target.id === 'feed-cancel') {
            clear()
        } else if (e.target.id === 'feed-save') {
            // TODO: inserta en local
        } else if (e.target.id === 'add-new-comment') {
            addOption()
        }
    }
    const clear = () => {
        btnAdd.style.display = 'inline-block'
        container.style.display = "none"
        container.innerHTML = "";
    }

    const addOption = () => {
        // TODO: lee cuantos inputs hay y calcula el valor que le corresponde al input y vuelve a cargar todo
    }

    const buildOption = () => {
        const component = /*html*/ `
<div class="add-feed__input">
    <label for="0eval">0%</label>
    <input type="text" placeholder="0% de evaluación" id="0eval"/>
</div>
`
        return component;
    }

    btnAdd.addEventListener('click', e => {
        e.preventDefault();

        container.addEventListener('click', eventsBtn);

        btnAdd.style.display = 'none'
        container.style.display = "block"

        container.innerHTML +=/*html*/ `
        <h3 class="add-feed__title">Agregar comentarios</h3>
        <span class="add-new-comment" id="add-new-comment">+</span>
        <div class="add-feed__input">
          <label for="tag">Tag</label>
          <input type="text" placeholder="Agregar titulo del comentario nuevo" id="tag"/>
        </div>
        <div class="add-feed__description">
          ${buildOption()}
          ${buildOption()}
          <div class="btn-save"><span class="button" id="feed-cancel">Cancelar</span><span class="button" id="feed-save">Guardar</span></div>
        </div>
        `
    });
}

module.exports = addFeed;