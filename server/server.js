const express = require("express");
var bodyParser = require("body-parser");

const db = require("./database");
const app = express();

// configure middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/colors", (req, res) => {
  const sql = "SELECT * FROM color";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get("/colors/:hex", (req, res) => {
  const sql = "SELECT * FROM color WHERE hex = ?";
  const params = [req.params.hex];
  db.get(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post("/colors", (req, res) => {
  let errors = [];
  if (!req.body.hex) {
    errors.push("No hex value specified");
  }
  if (!req.body.name) {
    errors.push("No name specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  const sql = "INSERT INTO color (hex, name) VALUES (?,?)";
  db.run(sql, [req.body.hex, req.body.name], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(201).location(`/colors/${req.body.hex}`).json();
  });
});

module.exports = app;
