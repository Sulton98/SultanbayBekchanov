const {Router} = require("express");
const { adminRegister, adminLogin } = require("../controllers/admin.controller");

const router = Router();

router.post(`/register`, adminRegister);
router.post(`/login`, adminLogin);

module.exports = router;