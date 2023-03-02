const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  _id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    index: { unique: true },
  },
  email: {
    type: String,
    index: { unique: true },
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  bio: {
    type: String,
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  avatar: {
    type: String,
  },
  photoUploads: [
    {
      type: Schema.Types.ObjectId,
      ref: "Photo",
    },
  ],
  savedPhotos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Photo",
    },
  ],
});

/**
 * Password hash middleware
 */
userSchema.pre("save", async function save(next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    user.password = await bcrypt.hash(user.password, 12);
    next();
  } catch (err) {
    next(err);
  }
});

/**
 * Helper method to validate password
 */
userSchema.methods.comparePassword = async (candidatePassword, cb) => {
  try {
    return cb(null, await bcrypt.compare(candidatePassword, this.password));
  } catch (err) {
    return cb(err);
  }
};

module.exports = mongoose.model("User", userSchema);
