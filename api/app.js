const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("foo");
});

app.use("/api/gov", require("./proposals/proposals"));
app.use("/api", require("./projects/projects"));
app.use("/api", require("./applications/applications"));

module.exports = app;
