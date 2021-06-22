const express = require("express");
const router = express.Router();
const User = require("../Models/user")


router.route("/")
.get(async function (req, res){
    //show list of 100 users via infinite scroll //click user to add
    let query = {contactNumber: req.query.query};
    if (req.query.query === undefined || req.query.query === null || req.query.query === ""){
        query = {}
    }

    //if user searched specific contact, show specific contact

    //if 
    User.find(query, function(err, foundDocs) {
        if(err){
            console.log(err);
        } else {
            res.json({
                docs: foundDocs
            });
        }
    });
    console.log("params :", req.params);
    // res.json({
    //     query: req.query
    // });
});

module.exports = router;