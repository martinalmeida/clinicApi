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
        let data = "";

        if (text.includes("Hola") || text.includes("hola") || text.includes("ola")) {
            data = {
                "messaging_product": "whatsapp",
                "to": "+573182834018",
                "text": {
                    "body": "Hola, buen día, escribe 1 si deseas agendar una cita envia, escribe 2 si deseas obtener un archivo pdf, escribe 3 si deseas salir 😁"
                }
            };
        }

        if (text == "1") {
            data = {
                "messaging_product": "whatsapp",
                "to": "+573182834018",
                "text": {
                    "body": "Gracias por agendar tu cita con nosotros. ❤️"
                }
            };
        }

        if (text == "2") {
            data = {
                "messaging_product": "whatsapp",
                "to": "+573182834018",
                "type": "document",
                "document": {
                    "link": "https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf"
                }
            };
        }

        if (text == "3") {
            data = {
                "messaging_product": "whatsapp",
                "to": "+573182834018",
                "text": {
                    "body": "Adios vuelve pronto 😊."
                }
            };
        }

        // peticion https
        try {
            let url = "https://graph.facebook.com/v17.0/113738338413456/messages";
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