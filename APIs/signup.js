require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const users = [{
    id: 1,
    name: "kaine"
},
{
    id: 2,
    name: "Ebi"
}
]

router.route("/")
    .get(function (req, res) {
        // res.json(users)
        // console.log("hello")
        res.send("signup Page");
    })
    .post(function (req, res) {
        console.log("reqBody: ", req.body);
        const user = req.body;
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        res.json({accessToken: accessToken});

        // req.headers.authorization = "Bearer" + " " + accessToken;

    }); 

    // function authenticateToken(req, res, next){
    //     const authHeader = req.headers["authorization"];
    //     const token = authHeader && authHeader.split(" ")[1];
    //     if (token == null) {
    //         return res.sendStatus(401);
    //     }

    //     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
    //         if (err){
    //             res.sendStatus(403)//invalid web token
    //         }
    //         req.user = user;
    //         next();
    //     });
    // }

module.exports = router;
