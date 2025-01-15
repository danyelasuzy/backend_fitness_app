import mongoose from "mongoose";

const ChallengeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  route: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
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
});

const Challenge = mongoose.model("Challenge", ChallengeSchema);

export { Challenge, ChallengeSchema };
