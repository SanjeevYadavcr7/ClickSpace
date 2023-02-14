const express = require("express");
const app = express();
const PORT = require("./config.keys").PORT;

app.listen(PORT, () => {
  console.log("Starting server at " + PORT);
});
