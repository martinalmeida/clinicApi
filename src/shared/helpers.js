/**
 * @description Metodo para obtener el mensaje en tipo texto de la peticion de WhatsApp
 * @param {*} messages 
 * @returns 
 */
exports.GetTextUser = (messages) => {
    let text = "";
    let typeMessge = messages["type"];

    // Si es un mensaje de tipo etxto
    if (typeMessge == "text") {

        text = (messages["text"])["body"];

        if (text == "hola") {
            console.log("esto es un saludo del cliente");
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