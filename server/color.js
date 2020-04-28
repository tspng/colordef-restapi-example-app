const db = require("./database");

const validateRequestData = ({ hex, name }) => {
  let errors = [];
  if (!hex) {
    errors.push("No hex value specified");
  }
  if (!name) {
    errors.push("No name specified");
  }
  return errors;
};

exports.getAll = (req, res) => {
  const sql = "SELECT * FROM color";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
};

exports.getOne = (req, res) => {
  const sql = "SELECT * FROM color WHERE hex = ?";
  db.get(sql, req.params.hex, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).end();
      return;
    }
    res.json(row);
  });
};

exports.post = (req, res) => {
  const { hex, name } = req.body;
  const errors = validateRequestData(req.body);
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  const sql = "INSERT INTO color (hex, name) VALUES (?,?)";
  db.run(sql, [hex, name], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(201).location(`/colors/${hex}`).json();
  });
};

exports.putOne = (req, res) => {
  const { hex, name } = req.body;
  const errors = validateRequestData(req.body);
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  const sql = "UPDATE color SET name = ? WHERE hex = ?";
  db.run(sql, [name, hex], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).end();
      return;
    }
    res.json({ hex: hex, name: name });
  });
};

exports.deleteOne = (req, res) => {
  const sql = "DELETE FROM color WHERE hex = ?";
  db.run(sql, req.params.hex, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).end();
      return;
    }
    res.json();
  });
};
