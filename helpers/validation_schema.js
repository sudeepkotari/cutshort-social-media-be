const Joi = require("joi");
const { ADMIN, USER } = require("../utils/constants");

const rigisterValidationSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  name: Joi.string().required(),
  password: Joi.string().min(8).required(),
});
const loginValidationSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
});
const createPostValidationSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
});

const updatePostValidationSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  body: Joi.string().required(),
  userId: Joi.string().required(),
});
const editPostValidationSchema = Joi.object({
  id: Joi.string(),
  title: Joi.string(),
  body: Joi.string(),
  userId: Joi.string(),
});

const createTodoValidationSchema = Joi.object({
  title: Joi.string().required(),
});

const updateTodoValidationSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  completed: Joi.boolean().required(),
  userId: Joi.string().required(),
});
const editTodoValidationSchema = Joi.object({
  id: Joi.string(),
  title: Joi.string(),
  completed: Joi.boolean(),
  userId: Joi.string(),
});

const addCommentValidationSchema = Joi.object({
  body: Joi.string().required(),
});
const editCommentValidationSchema = Joi.object({
  body: Joi.string().required(),
});
const setRoleValidationSchema = Joi.object({
  role: Joi.string().valid(ADMIN, USER).required(),
  userId: Joi.string().required()
});

module.exports = {
  rigisterValidationSchema,
  loginValidationSchema,
  createPostValidationSchema,
  updatePostValidationSchema,
  editPostValidationSchema,
  createTodoValidationSchema,
  updateTodoValidationSchema,
  editTodoValidationSchema,
  addCommentValidationSchema,
  editCommentValidationSchema,
  setRoleValidationSchema
};
