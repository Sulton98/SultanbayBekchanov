const Joi = require("joi");
const prisma = require("../utils/database");

const createCourse = async (req, res, next) => {
    try {
        const { title, description, lessonCount, userId } = req.body;
        const photo = req.file ? req.file.path : null;
    
        const schema = Joi.object({
          title: Joi.string().required(),
          description: Joi.string().required(),
        });
    
        const { error } = schema.validate({ title, description });
        if (error) return res.status(400).json({ message: error.message });
    
        const newCourse = await prisma.course.create({
          data: {
            title,
            description,
            photo,
          },
          lessons: {
            create: [],
        },
        });
    
        res.status(200).json({ message: "Course successfully created", data: newCourse });
      } catch (error) {
        next(error);
      };
};

const getAllCourses = async (req, res, next) => {
    try {
        const courses = await prisma.course.findMany();

        res.status(200).json({ message: "Success", data: courses });
    } catch (error) {
        next(error);
    };
};

const getCourseById = async (req, res, next) => {
    try {
        const {id} = req.params;

        const course = await prisma.course.findUnique({
            where: {id},
            include: { lessons: true },
        });

        if(!course)
            return res.status(404).json({ message: "Course not found" });

        res.status(200).json({ message: "Success", data: course });
    } catch (error) {
        next(error);
    };
};

const updateCourseById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {title, description } = req.body;
        const photo = req.file ? req.file.path : null;

        const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
    });

        const { error } = schema.validate({ title, description });
        if (error) return res.status(400).json({ message: error.message });

        const data = { title, description };
        if (photo) {
          data.photo = photo;
        };
    
        const updatedCourse = await prisma.course.update({
          where: { id },
          data,
        });
    
        res.status(200).json({ message: "Course successfully updated", data: updatedCourse });
    } catch (error) {
        next(error);
    };
};

const deleteCourseById = async (req, res, next) => {
    try {
        const {id} = req.params;

        const deletedCourse = await prisma.course.delete({
            where: {id},
        });

        res.status(200).json({ message: "Course successfully deleted", data: deletedCourse });
    } catch (error) {
        next(error);
    };
};

module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourseById,
    deleteCourseById
};