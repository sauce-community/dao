const app = require("./app");
// app exported to its own file
// so supertest can import and use "app" without causing it to start .listening

const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
