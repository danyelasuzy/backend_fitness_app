import mongoose from "mongoose";

const friendListSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Friend list must belong to a user"],
    },
    friends: [
      {
        friend: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: [true, "A friend is required"],
        },
        status: {
          type: String,
          enum: ["pending", "accepted"],
          default: "pending",
        },
        dateAdded: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const FriendList = mongoose.model("FriendList", friendListSchema);

export default FriendList;
