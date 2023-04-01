const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    body: {
      type: String,
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "post",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("comment", CommentSchema);
module.exports = Comment;
