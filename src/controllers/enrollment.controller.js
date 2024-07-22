const Joi = require("joi");
const prisma = require("../utils/database");

const enrollInCourse = async (req, res, next) => {
    try {
      const { userId, courseId } = req.body;
  
      const schema = Joi.object({
        userId: Joi.string().uuid().required(),
        courseId: Joi.string().uuid().required(),
      });
  
      const { error } = schema.validate({ userId, courseId });
      if (error) return res.status(400).json({ message: error.message });
  
      const enrollment = await prisma.enrollment.create({
        data: {
          userId,
          courseId,
        },
      });
  
      res.status(200).json({ message: "Successfully enrolled in course", data: enrollment });
    } catch (error) {
      next(error);
    };
  };

  const getEnrollmentsForUser = async (req, res, next) => {
    try {
      const { userId } = req.params;
  
      const enrollments = await prisma.enrollment.findMany({
        where: { userId },
        include: {
          course: true,
        },
      });
  
      res.status(200).json({ message: "Success", data: enrollments });
    } catch (error) {
      next(error);
    };
  };

  const getEnrollmentsForCourse = async (req, res, next) => {
    try {
      const { courseId } = req.params;
  
      const enrollments = await prisma.enrollment.findMany({
        where: { courseId },
        include: {
          user: true,
        },
      });
  
      res.status(200).json({ message: "Success", data: enrollments });
    } catch (error) {
      next(error);
    };
  };
  
  module.exports = {
    enrollInCourse,
    getEnrollmentsForUser,
    getEnrollmentsForCourse,
  };