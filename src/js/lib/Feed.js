module.exports = class feed {

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