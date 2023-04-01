const createError = require("http-errors");
const Post = require("../models/Post.model");
const Todo = require("../models/Todo.model");
const { ADMIN } = require("../utils/constants");
module.exports = {
  checkAccessToAdmin: (req, res, next) => {
    if (req.user.role === ADMIN) {
      next();
    } else {
      return next(createError.Unauthorized("Admin access required."));
    }
  },
  checkAcessToEditPost: (req, res, next) => {
    Post.findById(req.params.id)
      .then((post) => {
        if (!post) throw createError.NotFound("Post not found");
        if (req.user._id === post.userId || req.user.role === ADMIN) {
          next();
        } else {
          return next(createError.Unauthorized("Access required to edit."));
        }
      })
      .catch(() => {
        return next(createError.NotFound("Post not found."));
      });
  },
  checkAcessToEditTodo: (req, res, next) => {
    Todo.findById(req.params.id)
      .then((todo) => {
        if (!todo) throw createError.NotFound("Post not found");
        if (req.user._id === todo.userId || req.user.role === ADMIN) {
          next();
        } else {
          return next(createError.Unauthorized("Access required to edit."));
        }
      })
      .catch(() => {
        return next(createError.NotFound("Todo not found"));
      });
  },
};
