

const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    try {
        let token = req.header("x-token");
     
        if (!token) {
             res.status(401).send("Token not found");
        }
        let decode = jwt.verify(token, "jwtsecret");
        req.user = decode.user;
        next();
    } catch (err) {
        console.log(err);
         res.status(500).send("Server error");
    }
}
