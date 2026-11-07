const express = require("express");
const { register, login, me } = require("../controllers/auth.controller");
const { validateRegister, validateLogin } = require("../middleware/validateAuth");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/me", authenticate, me);

module.exports = router;
