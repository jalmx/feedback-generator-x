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
            <label class="label-feed">
              <input type="checkbox" name="${toIdHTML(element.name)}" id="${toIdHTML(element.name)}"/> ${element.name}
              <span class="erase">X</span>
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