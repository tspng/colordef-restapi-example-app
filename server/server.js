const express = require("express");
const db = require("./database");
const app = express();

app.get("/colors", (req, res) => {
  var sql = "select * from color";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

module.exports = app;
