const db = require("../database");

// helper function to insert colors into the database
const insertColors = (colors) => {
  let placeholders = colors.map((color) => "(?,?)").join(",");
  let sql = "INSERT INTO color (hex, name) VALUES " + placeholders;
  db.run(sql, colors.flat(), function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.debug(`Rows inserted ${this.changes}`);
  });
};

module.exports = {
  insertColors: insertColors,
};
