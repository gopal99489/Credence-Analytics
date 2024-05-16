const express = require("express");
require("dotenv").config();

const app = express();

const db = require("../database/database");

app.use(express.json());

const port = process.env.PORT || 5000;

//create data in the data base
app.post("/data", (req, res) => {
  const query = `insert into books (name, img, summary) values ('${req.body.name}', '${req.body.img}', '${req.body.summary}')`;
  console.log(query)
  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).json({ message: "contact me on github @noobwebdev777" });
    } else {
      res.status(200).json({ message: "data inserted" });
    }
  });
});

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
