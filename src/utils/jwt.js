const {sign, verify} = require("jsonwebtoken");
const config = require("../../config");

const secretKey = config.jwtSecretKey;
const secretKeyAdmin = config.jwtSecretKeyAdmin;
const expiresIn = config.jwtExpiresIn;

const generateToken = (payload) => sign(payload, secretKey, {expiresIn});
const generateTokenAdmin = (payload) => sign(payload, secretKeyAdmin, {expiresIn});

const verifyToken = (token, callback) => verify(token, secretKey, callback);
const verifyTokenAdmin = (token, callback) => verify(token, secretKeyAdmin, callback);

module.exports = {
    generateToken,
    generateTokenAdmin,
    verifyToken,
    verifyTokenAdmin
};