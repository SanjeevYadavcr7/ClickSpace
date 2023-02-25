const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
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
