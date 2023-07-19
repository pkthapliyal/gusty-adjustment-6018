const express = require("express");
require("dotenv").config();
const { connection } = require("./db");

const app = express();

app.use(express.json());

app.listen(process.env.PORT, async () => {
  await connection;
  console.log(`server started on port ${process.env.PORT}`);
});
