module.exports = class Feed {

    constructor(name = '', checked = false, data = {}) {
        this.name = name;
        this.data = data || {
            checked: checked,
            option: false,
            range: [],
            group: ''
        };
    }

}