const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("foo");
});

app.use("/applications", require("./applications/applications"));
app.use("/projects", require("./projects/projects"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
