require("dotenv").config();  
const express = require("express");
const router = express.Router();
// const authenticateToken = require("../Middleware/authenticateToken")

const jwt = require("jsonwebtoken");


const users = [{
    phone: "123456789",
    name: "kaine"
},
{ 
    phone: "987654321",
    name: "Ebi"
},
{
    phone: "9",
    name: "kaine"
}
]

router.route("/")
.get(authenticateToken, function (req, res) {
    res.json(users.filter(user => user.phone === req.user.contactNumber))
    // console.log("hello")
    // res.send("hello");
})

// .post()
;


function authenticateToken(req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
        if (err){
            res.sendStatus(403)//invalid web token
        }
        req.user = user;
        // req.token = token;

        // console.log(req.token)
        next();
    });
}

module.exports = router;