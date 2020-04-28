const express = require("express");
var bodyParser = require("body-parser");

const db = require("./database");
const color = require("./color");
const app = express();

// configure application level middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/colors", color.getAll);
app.post("/colors", color.post);
app.get("/colors/:hex", color.getOne);
app.put("/colors/:hex", color.putOne);
app.delete("/colors/:hex", color.deleteOne);

module.exports = app;
