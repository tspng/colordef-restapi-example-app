const express = require("express");
var bodyParser = require("body-parser");

const db = require("./database");
const controller = require("./controller");
const app = express();

// configure application level middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/colors", controller.getAll);
app.post("/colors", controller.post);
app.get("/colors/:hex", controller.getOne);
app.put("/colors/:hex", controller.put);
app.delete("/colors/:hex", controller.delete);

module.exports = app;
