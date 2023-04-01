const createError = require("http-errors");
const {
  createPostValidationSchema,
  updatePostValidationSchema,
  editPostValidationSchema,
  addCommentValidationSchema,
  editCommentValidationSchema,
} = require("../helpers/validation_schema");
const Post = require("../models/Post.model");
const Comment = require("../models/Comment.model");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { title, body } = await createPostValidationSchema.validateAsync(
        req.body
      );
      const post = new Post({
        userId: req.user._id,
        title,
        body,
      });
      const savedPost = await post.save();
      res.status(201).send(savedPost);
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },
  put: async (req, res, next) => {
    try {
      if (!req.params.id)
        throw createError.UnprocessableEntity("Post id is required.");
      const data = await updatePostValidationSchema.validateAsync(req.body);
      const post = await Post.findByIdAndUpdate(req.params.id, data, {
        returnOriginal: false,
      });
      if (!post) throw createError.NotFound("Post not found");
      res.send(post);
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },
  patch: async (req, res, next) => {
    try {
      if (!req.params.id)
        throw createError.UnprocessableEntity("Post id is required.");
      const data = await editPostValidationSchema.validateAsync(req.body);
      const post = await Post.findByIdAndUpdate(req.params.id, data, {
        returnOriginal: false,
      });
      if (!post) throw createError.NotFound("Post not found");
      res.send(post);
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      if (!req.params.id)
        throw createError.UnprocessableEntity("Post id is required.");
      const post = await Post.findById(req.params.id);
      if (!post) throw createError.NotFound("Post not found");
      res.send(post);
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      let { page, size } = req.query;
      if (!page) {
        page = 1;
      }
      if (!size) {
        size = 20;
      }
      limit = parseInt(size);
      skip = (page - 1) * size;
      const posts = await Post.find({}, {}, { limit: limit, skip: skip });
      if (!posts) throw createError.NotFound("Post not found");
      res.send(posts);
    } catch (error) {
      next(error);
    }
  },
  addComment: async (req, res, next) => {
    try {
      const { body } = await addCommentValidationSchema.validateAsync(req.body);
      const { postId } = req.params;
      const doesPostExist = await Post.findById(postId);
      if (!doesPostExist) throw createError.NotFound("Post not found");

      const comment = new Comment({
        userId: req.user._id,
        body,
        postId,
      });
      const savedComment = await comment.save();
      res.status(201).send(savedComment);
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },
  editComment: async (req, res, next) => {
    try {
      if (!req.params.id)
        throw createError.UnprocessableEntity("Comment id is required.");
      const data = await editCommentValidationSchema.validateAsync(req.body);
      const comment = await Comment.findByIdAndUpdate(req.params.id, data, {
        returnOriginal: false,
      });
      if (!comment) throw createError.NotFound("Comment not found");
      res.send(comment);
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },
  getAllComments: async (req, res, next) => {
    try {
      let { page, size } = req.query;
      let { postId } = req.params;
      if (!page) {
        page = 1;
      }
      if (!size) {
        size = 20;
      }
      limit = parseInt(size);
      skip = (page - 1) * size;
      const comments = await Comment.find(
        { postId },
        {},
        { limit: limit, skip: skip }
      ).populate("userId");
      if (!comments) throw createError.NotFound("Comment not found");
      res.send(comments);
    } catch (error) {
      next(error);
    }
  },
};
