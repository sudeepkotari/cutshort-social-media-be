const express = require("express");
const router = express.Router();
const TodoController = require("../controllers/todo.controller");
const { checkAcessToEditTodo } = require("../helpers/access_control_helper");
const { verifyAccessToken } = require("../helpers/jwt_helper");

router.post("/", verifyAccessToken, TodoController.create);
router.put("/:id", verifyAccessToken, checkAcessToEditTodo, TodoController.put);
router.patch(
  "/:id",
  verifyAccessToken,
  checkAcessToEditTodo,
  TodoController.patch
);
router.get("/:id", verifyAccessToken, TodoController.get);
router.get("/", verifyAccessToken, TodoController.getAll);

module.exports = router;
