const {Router} = require("express");
const { createLesson, getAllLessons, getLessonById, updateLessonById, deleteLessonById } = require("../controllers/lesson.controller");
const isAdmin = require("../middlewares/isAdmin.middlewares");
const isAuth = require("../middlewares/isAuth.middlewares");

const router = Router();

router.post('/', isAdmin, createLesson);
router.get('/', isAuth, isAdmin, getAllLessons);
router.get('/:id', isAuth, isAdmin, getLessonById);
router.put('/:id', isAdmin, updateLessonById);
router.delete('/:id', isAdmin, deleteLessonById);

module.exports = router;