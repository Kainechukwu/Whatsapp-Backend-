require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../Models/user")
const generateAccessToken = require("../Middleware/generateAccessToken");
const jwtDecode = require("jwt-decode");

router.route("/")

.post(async function (req, res) {
    const refreshToken = req.body.token;
    const decodedRefreshToken = jwtDecode(refreshToken);


    if(refreshToken == null) {
        return res.sendStatus(401);
    }

    const userTokens = await User.findOne(
        {
            contactNumber: decodedRefreshToken.contactNumber
        },
        "userTokens"
        ).exec();

        const refreshTokens = userTokens.userTokens;
        // console.log(refreshTokens)

        if(!refreshTokens.includes(refreshToken)) {
            return res.sendStatus(403)
        }



        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if(err) {
                return res.sendStatus(403)
            }
            const accessToken = generateAccessToken({contactNumber: user.contactNumber})

            res.json({accessToken: accessToken});  
        });





});

// console.log("env :", process.env.REFRESH_TOKEN_SECRET)


module.exports = router;