const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentReplySchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  commentedAt: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CommentReplie", commentReplySchema);
