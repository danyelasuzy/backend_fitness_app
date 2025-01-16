import mongoose from "mongoose";

const ChallengeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A challenge must have a name"],
  },
  description: {
    type: String,
    required: [true, "A challenge must have a description"],
  },
  distance: {
    type: Number,
    required: [true, "A challenge must have a distance in kilometers"],
  },
  difficulty: {
    type: String,
    required: true,
  },
  img: {
    type: String, // Store image URL or path
    required: [true, "A challenge must have an image"],
  },
  startPoint: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function (value) {
          return value.length === 2; // Ensure exactly 2 coordinates
        },
        message:
          "Coordinates must be an array of two numbers [longitude, latitude]",
      },
    },
  },
  endPoint: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function (value) {
          return value.length === 2;
        },
        message:
          "Coordinates must be an array of two numbers [longitude, latitude]",
      },
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: [true, "A challenge must be associated with a user"],
  },
});

const Challenge = mongoose.model("Challenge", ChallengeSchema);

export { Challenge, ChallengeSchema };
