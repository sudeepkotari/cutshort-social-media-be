const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const cors = require("cors");
require("dotenv").config();
require("./helpers/init_mongodb");
require("./helpers/init_redis");

const AuthRoute = require("./routes/auth.route");
const PostRoute = require("./routes/post.route");
const TodoRoute = require("./routes/todo.route");
const UserRoute = require("./routes/user.route");
const AdminRoute = require("./routes/admin.route");
const { limiter } = require("./helpers/rate_limit_helper");

const app = express();
app.use(cors()); // allow frontend domain here
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter); //rate limiter for all the API

app.get("/", async (req, res, next) => {
  res.send("Hello from express.");
});

app.use("/v1/auth", AuthRoute);
app.use("/v1/post", PostRoute);
app.use("/v1/todo", TodoRoute);
app.use("/v1/user", UserRoute);
app.use("/v1/admin", AdminRoute);

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));

module.exports = app;
