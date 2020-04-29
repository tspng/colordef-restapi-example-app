const express = require("express");
var bodyParser = require("body-parser");

const db = require("./database");
const controller = require("./controller");
const app = express();

// configure application level middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/colors", controller.getAll);
app.post("/api/colors", controller.post);
app.get("/api/colors/:hex", controller.getOne);
app.put("/api/colors/:hex", controller.put);
app.delete("/api/colors/:hex", controller.delete);

module.exports = app;
