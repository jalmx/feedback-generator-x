const arrayFeeds = require('./feedback')
const selectionAvailable = require('./section').selectionAvailable;

module.exports = function (event, containerFeedback) {

    if (event.target.dataset.input === 'checkbox' && event.target.type === 'checkbox') {
        selectionAvailable(event.target, containerFeedback);
    }

    let feedbackOk = [];
    let feedbackOpportunity = [];
    let range = event.target;

    let ranges = [...range.parentNode.parentNode.parentNode.querySelectorAll('input[type="range"]')];

    ranges.forEach((range, index) => {
        if (range.parentNode.previousElementSibling.children[0].checked) {
            let level = range.value / range.step;

            if(level === 0){
                feedbackOpportunity.push(arrayFeeds[index].data.range[level])
            }else{
                feedbackOk.push(arrayFeeds[index].data.range[level])
            }
        }
    })
    return {feedbackOk, feedbackOpportunity}
}