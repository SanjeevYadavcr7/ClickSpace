const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photoLikesSchema = new Schema({
  photo: {
    type: Schema.Types.ObjectId,
    ref: "Photo",
    required: true,
    unique: true,
  },
  user_likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("PhotoLike", photoLikesSchema);
