const express = require("express");
const app = express();
var session = require('express-session')
const passport = require("passport");
const { v4: uuidv4 } = require('uuid');


const cors = require('cors')

require("dotenv").config();
const { connection } = require("./db");
const { userRoute } = require("./routes/user.route");
const { lawyerRoute } = require("./routes/lawyer.route");
const { router } = require("./routes/oauth")
const { appointRoute } = require("./routes/appointment.route")

app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())
app.use(express.json());
app.use("/user", userRoute);
app.use("/lawyer", lawyerRoute);
app.use("/", router)
app.use("/appointment", appointRoute)


module.exports =
  app;


app.listen(process.env.PORT, async () => {
  await connection;
  console.log(`server started on port ${process.env.PORT}`);
});



