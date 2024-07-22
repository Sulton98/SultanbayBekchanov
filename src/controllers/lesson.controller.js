const Joi = require("joi");
const prisma = require("../utils/database");

const createLesson = async (req, res, next) => {
    try {
        const { title, courseId } = req.body;
        const video = req.file ? req.file.path : null;
    
        const schema = Joi.object({
          title: Joi.string().required(),
          courseId: Joi.string().uuid().required(),
        });
    
        const { error } = schema.validate({ title, courseId });
        if (error) return res.status(400).json({ message: error.message });
    
        const newLesson = await prisma.lesson.create({
          data: {
            title,
            video
          },
          course: { connect: { id: courseId } },
        });

        await prisma.course.update({
            where: { id: courseId },
            data: {
              lessonCount: {
                increment: 1,
              },
            },
          });
    
        res.status(200).json({ message: "Course successfully created", data: newLesson });
      } catch (error) {
        next(error);
      };
};

const getAllLessons = async (req, res, next) => {
    try {
        const lessons = await prisma.lesson.findMany();

        res.status(200).json({ message: "Success", data: lessons });
    } catch (error) {
        next(error);
    };
};

const getLessonById = async (req, res, next) => {
    try {
        const {id} = req.params;

        const lesson = await prisma.lesson.findUnique({
            where: {id},
        });

        if(!lesson)
            return res.status(404).json({ message: "Lesson not found" });

        res.status(200).json({ message: "Success", data: lesson });
    } catch (error) {
        next(error);
    };
};

const updateLessonById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {title, courseId} = req.body;
        const video= req.file ? req.file.path : null;

        const schema = Joi.object({
        title: Joi.string().required(),
        courseId: Joi.string().uuid().required(),
    });

        const { error } = schema.validate({ title, courseId });
        if (error) return res.status(400).json({ message: error.message });

        const data = { title, courseId };
        if (video) {
          data.video = video;
        }
    
        const updatedLesson = await prisma.lesson.update({
          where: { id },
          data,
        });
    
        res.status(200).json({ message: "Lesson successfully updated", data: updatedLesson });
    } catch (error) {
        next(error);
    };
};

const deleteLessonById = async (req, res, next) => {
    try {
        const {id} = req.params;

        const deletedLesson = await prisma.lesson.delete({
            where: {id},
        });

        await prisma.course.update({
            where: { id: lesson.courseId },
            data: {
              lessonCount: {
                decrement: 1,
              },
            },
          });

        res.status(200).json({ message: "Lesson successfully deleted", data: deletedLesson });
    } catch (error) {
        next(error);
    };
};

module.exports = {
    createLesson,
    getAllLessons,
    getLessonById,
    updateLessonById,
    deleteLessonById
};