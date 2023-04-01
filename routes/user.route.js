const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const { verifyAccessToken } = require("../helpers/jwt_helper");


router.get("/:id", verifyAccessToken, UserController.get);

module.exports = router;
