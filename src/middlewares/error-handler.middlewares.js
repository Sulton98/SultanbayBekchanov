const errorHandler = async (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "An error occured" });
};

module.exports = errorHandler;