const createError = require("http-errors");
const {
  createTodoValidationSchema,
  updateTodoValidationSchema,
  editTodoValidationSchema,
} = require("../helpers/validation_schema");
const Todo = require("../models/Todo.model");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { title } = await createTodoValidationSchema.validateAsync(
        req.body
      );
      const todo = new Todo({
        userId: req.user._id,
        title,
      });
      const savedTodo = await todo.save();
      res.status(201).send(savedTodo);
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },
  put: async (req, res, next) => {
    try {
      if (!req.params.id)
        throw createError.UnprocessableEntity("Todo id is required.");
      const data = await updateTodoValidationSchema.validateAsync(req.body);
      const todo = await Todo.findByIdAndUpdate(req.params.id, data, {
        returnOriginal: false,
      });
      if (!todo) throw createError.NotFound("Todo not found");
      res.send(todo);
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },
  patch: async (req, res, next) => {
    try {
      if (!req.params.id)
        throw createError.UnprocessableEntity("Todo id is required.");
      const data = await editTodoValidationSchema.validateAsync(req.body);
      const todo = await Todo.findByIdAndUpdate(req.params.id, data, {
        returnOriginal: false,
      });
      if (!todo) throw createError.NotFound("Todo not found");
      res.send(todo);
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      if (!req.params.id)
        throw createError.UnprocessableEntity("Todo id is required.");
      const todo = await Todo.findById(req.params.id);
      if (!todo) throw createError.NotFound("Todo not found");
      res.send(todo);
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
      const todos = await Todo.find({}, {}, { limit: limit, skip: skip });
      if (!todos) throw createError.NotFound("Todo not found");
      res.send(todos);
    } catch (error) {
      next(error);
    }
  },
};
