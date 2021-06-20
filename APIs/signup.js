require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../Models/user")

// const users = [{
//     id: 1,
//     name: "kaine"
// },
// {
//     id: 2,
//     name: "Ebi"
// }
// ]

router.route("/")
    .get(function (req, res) {
        // res.json(users)
        // console.log("hello")
        res.send("signup Page");
    })
    .post(function (req, res) {
        console.log("reqBody: ", req.body);
        // const person = new User ({
        //     // firstName: req.body.firstName,
        //     // lastName: req.body.lastName,
        //     // username: req.body.username,
        //     contactNumber: req.body.contactNumber,
        //     // userType: req.body.userType
        // });

        User.findOne({
            contactNumber: req.body.contactNumber
        },
            function (err, foundDoc) {
                if (err) {
                    console.log("UserQueryError", err)
                }
                if (foundDoc) {
                  
                    // console.log("doc", foundDoc);
                    // res.status(200).send("Authentication Successful");

                    const user = { contactNumber: foundDoc.contactNumber }
                    handleAuthorization(req, res, user, foundDoc);


                }

                if (!foundDoc) {
                    const user = new User({
                        // firstName: req.body.firstName,
                        // lastName: req.body.lastName,
                        // username: req.body.username,
                        contactNumber: req.body.contactNumber,
                        // userType: req.body.userType
                    });

                    user.save(function (err) {
                        if (err) {
                            console.log("tweetSaveError :", err)
                        } else {
                            const user = { contactNumber: req.body.contactNumber }

                            User.findOne(user, function (err, foundDoc){
                                handleAuthorization(req, res, user, foundDoc);
                            });
                            
                            

                        }
                    });
                }
            });


        // if (!user){
        //     res.status(404).json({message: "Body empty"}) 
        // }


    });
function handleAuthorization(req, res, user, foundDoc) {
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user,
        process.env.REFRESH_TOKEN_SECRET);

        foundDoc.userTokens.push(refreshToken);
        foundDoc.save();
    // refreshToken Push

    // User.findOneAndUpdate({});



    res.json({
        accessToken: accessToken,
        refreshToken: refreshToken
    });

}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
}


module.exports = router;
