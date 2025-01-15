import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Achievement must have a name"],
    },
    description: {
      type: String,
      required: [true, "Achievement must have a description"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Achievement must belong to a user"],
    },
    dateEarned: {
      type: Date,
      default: Date.now,
    },
    type: {
      type: String,
      enum: ["milestone", "event", "custom"],
      default: "milestone",
    },
    badge: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Achievement = mongoose.model("Achievement", achievementSchema);

export default Achievement;
