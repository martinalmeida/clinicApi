const http = require("axios");
/**
 * @description Metodo para obtener el mensaje en tipo texto de la peticion de WhatsApp
 * @param {*} messages 
 * @returns 
 */
exports.GetTextUser = async (messages) => {
    let text = "";
    let typeMessge = messages["type"];

    // Si es un mensaje de tipo etxto
    if (typeMessge == "text") {

        text = (messages["text"])["body"];

        if (text == "hola") {
            let url = "https://graph.facebook.com/v17.0/113738338413456/messages";
            let data = JSON.stringify({
                "messaging_product": "whatsapp",
                "to": "+573182834018",
                "text": {
                    "body": "Hola señor locutor :)"
                }
            });

            const request = await http.post(url, data, {
                headers: {
                    "Authorization": "Bearer " + process.env.TOKEN_FACEBOOK
                }
            });

        }
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