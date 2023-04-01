const express = require("express");
const router = express.Router();
const PostController = require("../controllers/post.controller");
const { checkAcessToEditPost } = require("../helpers/access_control_helper");
const { verifyAccessToken } = require("../helpers/jwt_helper");

router.post("/", verifyAccessToken, PostController.create);
router.put("/:id", verifyAccessToken, checkAcessToEditPost, PostController.put);
router.patch(
  "/:id",
  verifyAccessToken,
  checkAcessToEditPost,
  PostController.patch
);
router.get("/:id", verifyAccessToken, PostController.get);
router.get("/", verifyAccessToken, PostController.getAll);

router.post("/:postId/comment", verifyAccessToken, PostController.addComment);
router.patch(
  "/:postId/comment/:id",
  verifyAccessToken,
  PostController.editComment
);
router.get(
  "/:postId/comments",
  verifyAccessToken,
  PostController.getAllComments
);

module.exports = router;
