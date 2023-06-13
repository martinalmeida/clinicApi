const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
const processMessage = require("../shared/processMessage");

const VerifyToken = (req, res) => {

    try {
        let accessToken = process.env.TOKEN_VERIFY;
        let token = req.query["hub.verify_token"];
        let challenge = req.query["hub.challenge"];

        if (challenge != null && token != null && token == accessToken) {
            res.send(challenge);
        } else {
            res.status(400).send();
        }

    } catch (e) {
        res.status(400).send();
    }
}

const ReceivedMessage = (req, res) => {
    try {
        let entry = (req.body["entry"])[0];
        let changes = (entry["changes"])[0];
        let value = changes["value"];
        let messageObject = value["messages"];

        if (typeof messageObject != "undefined") {
            let messages = messageObject[0];
            let number = messages["from"];

            let text = GetTextUser(messages);

            if (text != "") {
                processMessage.Process(text, number);
            }

        }

        res.send("EVENT_RECEIVED");
    } catch (e) {
        myConsole.log(e);
        res.send("EVENT_RECEIVED");
    }
}

function GetTextUser(messages) {
    let text = "";
    let typeMessge = messages["type"];
    if (typeMessge == "text") {
        text = (messages["text"])["body"];
    }
    else if (typeMessge == "interactive") {

        let interactiveObject = messages["interactive"];
        let typeInteractive = interactiveObject["type"];

        if (typeInteractive == "button_reply") {
            text = (interactiveObject["button_reply"])["title"];
        }
        else if (typeInteractive == "list_reply") {
            text = (interactiveObject["list_reply"])["title"];
        } else {
            myConsole.log("sin mensaje");
        }
    } else {
        myConsole.log("sin mensaje");
    }
    return text;
}

module.exports = {
    VerifyToken,
    ReceivedMessage
}
