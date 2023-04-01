const createError = require("http-errors");
const { setRoleValidationSchema } = require("../helpers/validation_schema");
const User = require("../models/User.model");

module.exports = {
  setRole: async (req, res, next) => {
    try {
      const { role, userId } = await setRoleValidationSchema.validateAsync(
        req.body
      );
      const user = await User.findByIdAndUpdate(
        userId,
        { role },
        {
          returnOriginal: false,
        }
      );
      if (!user) throw createError.NotFound("User not found");
      res.send({message: "Updated user role"});
    } catch (error) {
      next(error);
    }
  },
};
