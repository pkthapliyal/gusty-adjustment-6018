const express = require("express");
const bcrypt = require("bcrypt");
const userRoute = express.Router();
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");

userRoute.post("/register", async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new UserModel({ name, email, password, role });
    await user.save();
    res.json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
});

userRoute.post("/login", async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const user = await UserModel.findOne({ name });
    if (!user) {
      return res.status(401).json({ message: "Wrong credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Wrong credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).send({ token });
  } catch (error) {
    next(error);
  }
});

module.exports = { userRoute };
