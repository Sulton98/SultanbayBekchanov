const {Router} = require("express");
const { createCourse, getAllCourses, getCourseById, updateCourseById, deleteCourseById } = require("../controllers/course.controller");
const isAdmin = require("../middlewares/isAdmin.middlewares");
const isAuth = require("../middlewares/isAuth.middlewares");

const router = Router();

router.post('/', isAdmin, createCourse);
router.get('/', isAuth, isAdmin, getAllCourses);
router.get('/:id', isAuth, isAdmin, getCourseById);
router.put('/:id', isAdmin, updateCourseById);
router.delete('/:id', isAdmin, deleteCourseById);

module.exports = router;