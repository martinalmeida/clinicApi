const expres = require("express");
const router = expres.Router();
const whatsAppController = require("../controllers/whatsappControllers");

router
    .get("/", whatsAppController.veryfyWehook)
    .post("/", whatsAppController.webhook)

module.exports = router;