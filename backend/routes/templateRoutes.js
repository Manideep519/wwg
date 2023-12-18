const express = require("express");

const templateController = require("../controllers/templateController");
const { authenticateJWT } = require("../middlewares/jwtAuth");
const router = express.Router();

router.get("/all", templateController.getAllTemplates);
router.get("/user/:id", templateController.getTemplatesByUserId);
router.get("/:id", templateController.getTemplateById);
router.post("/create", authenticateJWT, templateController.createTemplate);

module.exports = router;
