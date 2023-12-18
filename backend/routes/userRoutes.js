const express = require("express");

const { check } = require("express-validator");

const userControllers = require("../controllers/userController");
const router = express.Router();

router.post(
  "/signup",
  [
    check("firstName").notEmpty(),
    check("lastName").notEmpty(),
    check("email").notEmpty(),
    check("password").notEmpty(),
    check("phoneNumber").notEmpty(),
  ],
  userControllers.createUser
);
router.post("/login", userControllers.loginUser);

module.exports = router;
