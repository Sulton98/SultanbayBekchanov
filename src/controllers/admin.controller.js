const bcrypt = require("bcrypt");
const Joi = require("joi");
const prisma = require("../utils/database");
const {generateTokenAdmin} = require("../utils/jwt");

const adminRegister = async (req, res, next) => {
    try {
        const {fullname, phone, password} = req.body;

        const check = Joi.object({
            fullname: Joi.string().min(6).required(),
            phone: Joi.string().min(6).required(),
            password: Joi.string().min(6).required()
        });

        const {error} = check.validate({fullname, phone, password});
        if(error) return res.status(400).json({ message: error.message });

        const findAdmin = await prisma.user.findUnique({
            where: {phone},
        });

        if(findAdmin) return res.status(400).json({ message: "Admin already exists" });

        const hashedPass = await bcrypt.hash(password, 12);

        const newAdmin = await prisma.user.create({
            data: {fullname,
            phone,
            password: hashedPass,
            isAdmin: true
    }});

        res.status(200).json({ message: "Admin successfully registered", data: newAdmin });
    } catch (error) {
        next(error);
    };
};

const adminLogin = async (req, res, next) => {
    try {
        const {phone, password} = req.body;

        const check = Joi.object({
            phone: Joi.string().min(6).required(),
            password: Joi.string().min(6).required()
        });

        const {error} = check.validate({phone, password});
        if(error) return res.status(400).json({ message: error.message });

        const findAdmin = await prisma.user.findUnique({
            where: {phone},
        });

        if(!findAdmin) return res.status(400).json({ message: "Incorrect phone or password" });

        const verify = await bcrypt.compare(password, findAdmin.password);

        if(!verify) return res.status(400).json({ message: "Incorrect password" });

        const token = generateTokenAdmin({id: findAdmin.id, isAdmin: true});

        res.status(201).json({ message: "Success", data: token });
    } catch (error) {
        next(error);
    };
};

module.exports = {
    adminRegister,
    adminLogin
};