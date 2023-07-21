const express = require("express");
require("dotenv").config();

const { connection } = require("./db");
const cors = require("cors");
const { userRoute } = require("./routes/user.route");
const { lawyerRoute } = require("./routes/lawyer.route");
const { appointRoute } = require("./routes/appointment.route");

const app = express();
app.use(cors());

app.use(express.json());
app.use("/user", userRoute);
app.use("/lawyer", lawyerRoute);
app.use("/appointment", appointRoute);

app.listen(process.env.PORT, async () => {
  await connection;
  console.log(`server started on port ${process.env.PORT}`);
});
