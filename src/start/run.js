const config = require("../../config");

const run = async (app) => {
    const PORT = config.port;

    app.listen(PORT, () => {
        console.log(`Server starts on port: ${PORT}`);
    });
};

module.exports = run;