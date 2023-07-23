const express = require("express");
const bcrypt = require("bcrypt");
const userRoute = express.Router();
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");
const { LawyerModel } = require("../model/lawyer.model");
userRoute.post("/register", async (req, res, next) => {
  try {
    const { name, email, password, role, mobile } = req.body;
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new UserModel({ name, email, password, role, mobile });
    await user.save();
    res.json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
});
userRoute.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const userData = await UserModel.findById(user._id);
    if (!user) {
      return res.status(401).json({ message: "Wrong credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Wrong credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    const lawyer = await LawyerModel.findOne({
      userId: userData._id,
    });
    res.status(200).send({ token, userData, lawyer });
  } catch (error) {
    console.log(error);
    next(error);
  }
});
userRoute.post("/logout", async (req, res) => {
  try {
    // Add token to blacklist collection
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const blacklistedToken = new BlacklistModel({ token });
    await blacklistedToken.save();
    res.send("token blacklisted");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});
userRoute.get("/", async (req, res) => {
  let users = await UserModel.find();
  res.send(users);
});
module.exports = { userRoute };