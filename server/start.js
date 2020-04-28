// start.js
const port = 3000;
const app = require("./server.js");

app.listen(3000, () =>
  console.log(`ColorDef API listening at http://localhost:${port}`)
);
