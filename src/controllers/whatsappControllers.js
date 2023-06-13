const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
const processMessage = require("../shared/processMessage");
const helpers = require("../shared/helpers");

/**
 * @description Metodo para validar webhook desde Facebook
 * @param {*} req 
 * @param {*} res 
 */
exports.veryfyWehook = (req, res) => {
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

/**
 * @description Metodo para procesar los mensajes
 * @param {*} req 
 * @param {*} res 
 */
exports.webhook = (req, res) => {
    try {
        console.log(JSON.stringify(req.body));
        let entry = (req.body["entry"])[0];
        let changes = (entry["changes"])[0];
        let value = changes["value"];
        let messageObject = value["messages"];

        if (typeof messageObject != "undefined") {
            let messages = messageObject[0];
            let number = messages["from"];

            let text = helpers.GetTextUser(messages);

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
