const {Router} = require("express");
const { enrollInCourse, getEnrollmentsForUser, getEnrollmentsForCourse } = require("../controllers/enrollment.controller");
const isAuth = require("../middlewares/isAuth.middlewares");

const router = Router();

router.post('/', isAuth, enrollInCourse);
router.get('/:id', isAuth, getEnrollmentsForUser);
router.get('/:id', getEnrollmentsForCourse);

module.exports = router;