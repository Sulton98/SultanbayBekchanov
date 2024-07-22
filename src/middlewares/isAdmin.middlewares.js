const {verifyTokenAdmin} = require("../utils/jwt");

const isAdmin = (req, res, next) => {
    if(!req.headers.token)
        return res.status(401).json({ message: "Permission denied" });

verifyTokenAdmin (req.headers.token, async (err, data) => {
    if(err) return res.status(401).json({ message: "Token is wrong" });

    req.user = data;
    const id = req.user.id;
    next();
});
};

module.exports = isAdmin;