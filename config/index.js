require("dotenv/config");
const {env} = process;

const config = {
    port: +env.PORT,
    jwtSecretKey: env.jwtSecretKey,
    jwtSecretKeyAdmin: env.jwtSecretKeyAdmin,
    jwtExpiresIn: env.jwtExpiresIn
};

module.exports = config;