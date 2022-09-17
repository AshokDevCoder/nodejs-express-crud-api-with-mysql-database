const express = require("express");
const router = require("./route/router");
const cors = require("cors");
const path = require("path");
const db = require("./db/db.config");
const app = express();
//middleware
app.use(express.json());
app.use(cors());
//database connection
db.connect((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("connected to database with state: " + db.state);
});
//routers
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});
app.use("/", router);
const port = 4000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
