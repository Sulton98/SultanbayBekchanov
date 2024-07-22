const bcrypt = require("bcrypt");
const Joi = require("joi");
const prisma = require("../utils/database");
const {generateToken} = require("../utils/jwt");

const registerController = async (req, res, next) => {
    try {
        const {fullname, phone, password} = req.body;

        const check = Joi.object({
            fullname: Joi.string().min(6).required(),
            phone: Joi.string().min(6).required(),
            password: Joi.string().min(6).required()
        });

        const {error} = check.validate({fullname, phone, password});
        if(error) return res.status(400).json({ message: error.message });

        const findUser = await prisma.user.findUnique({
            where: {phone},
        });

        if(findUser) return res.status(400).json({ message: "Phone already exists" });

        const hashedPass = await bcrypt.hash(password, 12);

        const newUser = await prisma.user.create({
            data: {fullname,
            phone,
            password: hashedPass
    }});

        res.status(200).json({ message: "User successfully registered", data: newUser });
    } catch (error) {
        next(error);
    };
};

const loginController = async (req, res, next) => {
    try {
        const {phone, password} = req.body;

        const check = Joi.object({
            phone: Joi.string().min(6).required(),
            password: Joi.string().min(6).required()
        });

        const {error} = check.validate({phone, password});
        if(error) return res.status(400).json({ message: error.message });

        const findUser = await prisma.user.findUnique({
            where: {phone},
        });

        if(!findUser) return res.status(400).json({ message: "Incorrect phone or password" });

        const verify = await bcrypt.compare(password, findUser.password);

        if(!verify) return res.status(400).json({ message: "Incorrect password" });

        const token = generateToken({id: findUser.id});

        res.status(201).json({ message: "Success", data: token });
    } catch (error) {
        next(error);
    };
};

module.exports = {
    registerController,
    loginController
};