module.exports = class Feed {

    constructor(name = '', checked = false, data = { checked: checked, option: false, range: [], group: '' }) {
        this.name = name;
        this.data = data;
    }

}