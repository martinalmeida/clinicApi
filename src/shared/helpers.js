const axios = require('axios');
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
            let data = {
                "messaging_product": "whatsapp",
                "to": "+573182834018",
                "text": {
                    "body": "Hola señor locutor :)"
                }
            };

            try {
                const response = await axios.post(url, data, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + process.env.TOKEN_FACEBOOK
                    }
                });
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }

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