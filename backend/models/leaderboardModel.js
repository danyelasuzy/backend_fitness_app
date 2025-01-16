import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Leaderboard entry must belong to a user"],
    },
    totalKilometers: {
      type: Number,
      default: 0,
      required: [true, "Total kilometers must be recorded"],
    },
    badges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Achievement",
        required: false, // Badges are optional
      },
    ],
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

export default Leaderboard;
