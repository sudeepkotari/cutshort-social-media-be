const createError = require("http-errors");
const User = require("../models/User.model");

module.exports = {
  get: async (req, res, next) => {
    try {
      if (!req.params.id)
        throw createError.UnprocessableEntity("Todo id is required.");
      const user = await User.findById(req.params.id, { password: false });
      if (!user) throw createError.NotFound("User not found");
      res.send(user);
    } catch (error) {
      next(error);
    }
  },
};
