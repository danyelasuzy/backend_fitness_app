import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  location: { type: String, required: true },
  password: { type: String, required: true, minlength: 8 },
  confirmPassword: {
    type: String,
    required: false,
    //This only works on CREATE and SAVE!!!
    validate: {
      validator: function (el) {
        return el === this.password;
      },
    },
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  avatarUrl: { type: String, default: "" },
  badges: { type: [String], default: [] },
  medals: {
    gold: { type: Number, default: 0 },
    silver: { type: Number, default: 0 },
    bronze: { type: Number, default: 0 },
  },
});

// Remove confirmPassword before saving
userSchema.pre("save", function (next) {
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

export const User = mongoose.model("User", userSchema);
