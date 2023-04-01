const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/admin.controller");
const { checkAccessToAdmin } = require("../helpers/access_control_helper");
const { verifyAccessToken } = require("../helpers/jwt_helper");

router.patch(
  "/setrole",
  verifyAccessToken,
  checkAccessToAdmin,
  AdminController.setRole
);

module.exports = router;
