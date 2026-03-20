const express = require("express");
const router = express.Router();

const { register, login, getProfile } = require("../controllers/authController");
const { registerValidation, loginValidation } = require("../validators/authValidator");
const validateRequest = require("../middleware/validateMiddleware");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/register", registerValidation, validateRequest, register);
router.post("/login", loginValidation, validateRequest, login);
router.get("/profile", verifyToken, getProfile);

module.exports = router;