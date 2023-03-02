const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  _id: {
    type: String,
    unique: true,
  },
  photo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  hashtags: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Photo", photoSchema);
