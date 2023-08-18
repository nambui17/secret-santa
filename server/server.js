const express = require("express");
const ParseServer = require("parse-server");

const app = express();
const api = require("./config/connection");
await api.start();

app.use("/parse", api.app);

const port = 1337;
app.listen(port, function () {
  console.log("parse-server started running on port" + port + ".");
});
