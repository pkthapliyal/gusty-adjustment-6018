const express = require("express")
const { v4: uuidv4 } = require('uuid');
const { UserModel } = require("../model/user.model");
const passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const router = express.Router()

passport.use(new GoogleStrategy({
    clientID: '674308305530-38i4dioh3b72dqfukb4jpudf8uj7bs96.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:8080/auth/google/callback"
},
    function (googleAccessToken, refreshToken, profile, cb) {
        // return cb(null, profile);
        return cb(null, { googleAccessToken, name: profile.displayName, email: profile.emails[0].value })
    }
));


passport.serializeUser(function (user, done) {
    done(null, user);
})
passport.deserializeUser(function (user, done) {
    done(null, user);
    // console.log(user._json)
})


router.get("/auth/google",
    passport.authenticate('google', { scope: ["email", 'profile'] })
)


router.get("/auth/google/callback",
    passport.authenticate("google", {
        // successRedirect: "/dashboard",
        failureRedirect: "/auth/failure",
        // session: false
    }),
    async function (req, res) {
        const { email, name, googleAccessToken } = req.user

        // / find the existing user, 
        //  then save th euser 
        // 

        // isUser = await UserModel.findOne({ email })
        // const OTP = Math.floor(Math.random() * 99999) + 100000
        let User = { email, name, password: uuidv4(), role: "client" }
        const user = await UserModel(User)
        user.save()
        res.redirect(`http://127.0.0.1:5500/Back-end/routes/roles.html?id=${user._id}`)
        // if (isUser) {
        //     await redisClient.setEx(email, 120, JSON.stringify(OTP))
        //     let result = await redisClient.get(email)
        //     mailer(OTP, email)
        //     const accessToken = jwt.sign({ email, userID: isUser._id }, secretKey, { expiresIn: "2m" })
        //     res.cookie("access_token", accessToken)
        //     // return res.send({ status: true, data: isUser })
        //     // res.sendFile(__dirname + "/dashboard.html")
        //     res.redirect(`http://127.0.0.1:5500/index.html?token=${accessToken}`)
        // }
        // else {
        //     let User = { email, name, password: uuidv4() }
        //     const user = await UserModel(User)
        //     await user.save()
        //     const accessToken = jwt.sign({ email, userID: user._id }, secretKey, { expiresIn: "2m" })
        //     await redisClient.setEx(email, 120, JSON.stringify(OTP))
        //     let result = await redisClient.get(email)
        //     console.log(result)
        //     mailer(OTP, email)
        //     res.cookie("access_token", accessToken)
        //     res.redirect(`http://127.0.0.1:5500/gusty-adjustment-6018/Front-end/index.html?token=${accessToken}`)
        //     // res.sendFile(__dirname + "/dashboard.html")
        // }
    }
)
module.exports = {
    router
}