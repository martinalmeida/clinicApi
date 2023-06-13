require("dotenv").config({ path: "../.env" }); // Ruta relativa al archivo .env

const express = require("express");
const apiRoute = require("./routes/routes");

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use("/whatsapp", apiRoute);

app.listen(PORT, () => {
    console.log("El puerto es: " + PORT);
});