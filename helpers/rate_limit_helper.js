const rateLimit = require("express-rate-limit");

module.exports.limiter = rateLimit({
  windowMs: 10 * 1000, // 15 minutes
  max: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    message:
      "Too many requests created from this IP, please try again after 10 seconds",
  },
});
