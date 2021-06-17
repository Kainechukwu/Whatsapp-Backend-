require("dotenv").config();


function authenticateToken(req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log("token :", token)
    console.log("authHeader :", authHeader)
    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
        if (err){
            res.sendStatus(403)//invalid web token
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;