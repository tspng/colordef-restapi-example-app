const express = require("express");
const app = require("./server.js");

const PORT = 3000;

// serve static files (frontend) from public/
app.use(express.static("public"));

app.listen(PORT, () =>
  console.log(`ColorDef API listening at http://localhost:${PORT}`)
);
