const express = require("express");
const bcrypt = require("bcrypt");
const userRoute = express.Router();
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");

userRoute.post("/register", async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    console.log({ name, email, password, role })
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      console.log("userexist",userExists)
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new UserModel({ name, email, password, role });
    await user.save();
    console.log("uesr",user)
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


//oauth
// var GoogleStrategy = require('passport-google-oauth20').Strategy;
// const passport = require("passport");
// passport.use(new GoogleStrategy({
//     clientID: '568281391257-2umu5i0s425fbv8puheupaehoaclmtcu.apps.googleusercontent.com',
//     clientSecret: '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',
//     callbackURL: 'http://localhost:3300/user/auth/google/callback'
//   },
//   async function(accessToken, refreshToken, profile, cb) {
//     var { email } = profile._json;
//     let user;
//     try {
//       user = await UserModel.findOne({ email });
//       if (user) {
//         return cb(null, user);
//       }
//       console.log("email",profile)
//       user = new UserModel({
//        name: profile.displayName,
//         email: profile._json.email,
//         role:"user",
//         password: uuidv4(),
//       });
//       await user.save();
//       return cb(null, user);
//     } catch (error) {
//       console.log("error in oauth",error);
//     }
//   }
// ));
// passport.serializeUser((user,done)=>{
//   done(null,user)
// })

// passport.deserializeUser((user,done)=>{
//   done(null,user)
// })
// userRoute.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// userRoute.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/login",
//     session: false,
//   }),
//   function(req, res) {
//     let user = req.user;
//     var token = jwt.sign({ userID: user._id },process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });
//     res.redirect(
//       ` file:///D:/Downloads/Front-end/Front-end/index.html?&email=${user.email}&token=${token}&name=${user.name}`
//     );
   
//   });

module.exports = { userRoute };
