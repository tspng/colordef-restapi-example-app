const sqlite3 = require("sqlite3").verbose();

var DATABASE = "db.sqlite";
if (process.env.NODE_ENV === "test") {
  DATABASE = ":memory:";
}

const CREATE_STATEMENT = `CREATE TABLE IF NOT EXISTS color (
    hex text PRIMARY KEY, 
    name text UNIQUE, 
    CONSTRAINT name_unique UNIQUE (name)
)`;

const db = new sqlite3.Database(DATABASE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.debug(`Connected to SQLite database (${DATABASE}).`);
    // Create database tables if they don't exist yet
    db.run(CREATE_STATEMENT, () => {});
  }
});

module.exports = db;
