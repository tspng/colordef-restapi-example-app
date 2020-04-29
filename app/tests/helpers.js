const db = require("../database");

// helper function to insert colors into the database
exports.insertColors = (colors) => {
  let placeholders = colors.map((color) => "(?,?)").join(",");
  let sql = "INSERT INTO color (hex, name) VALUES " + placeholders;
  db.run(sql, colors.flat(), (err) => {
    if (err) {
      return console.error(err.message);
    }
    // console.debug(`Rows inserted ${this.changes}`);
  });
};

exports.clearDatabase = () => {
  db.run("DELETE FROM color", []);
};
