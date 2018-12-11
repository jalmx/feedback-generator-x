
const buildMessage = (message = {}) => {

    let feedback = "", feedbackOpportunity = "";

    if (message.feedbackOk.length > 0) {
        for (const feed of message.feedbackOk) {
            feedback += feed + " ";
        }
        feedback += "\n";
    }

    if (message.feedbackOpportunity.length > 0) {
        feedbackOpportunity = 'Como área de oportunidad te sugiero '
        for (const opportunity of message.feedbackOpportunity) {
            feedbackOpportunity += opportunity + " ";
        }
        feedbackOpportunity += "\n";
    }
    return cleanMessage(
        message.greeting + " " + message.name,
        feedback,
        feedbackOpportunity,
        message.phrase,
        message.goodbye,
        message.sign
    );
}

const addMessage = (container, message) => {
    container.value = buildMessage(message);
}

const cleanMessage = (...text) => {
    let message = ""

    for (let index = 0; index < text.length; index++) {

        if (text[index] !== "")
            message += text[index] + "\n"
    }

    return message;
}

module.exports = {
    buildMessage,
    addMessage
}