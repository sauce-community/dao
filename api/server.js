const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("foo");
});

app.use("/api/gov", require("./proposals/proposals"));
app.use("/api", require("./projects/projects"));
app.use("/api", require("./applications/applications"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
