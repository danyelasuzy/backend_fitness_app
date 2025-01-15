import { Challenge } from "../models/challengeModel.js";

export const createChallenge = async (req, res) => {
  try {
    const { name, route, difficulty, startPoint, endPoint } = req.body;

    // Validate input
    if (!name || !route || !difficulty || !startPoint || !endPoint) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }

    // Check if the challenge already exists
    const existingChallenge = await Challenge.findOne({ name });
    if (existingChallenge) {
      return res.status(400).json({
        status: "fail",
        message: "The challenge is already created",
      });
    }

    // Create a new challenge
    const newChallenge = await Challenge.create({
      name,
      route,
      difficulty,
      startPoint,
      endPoint,
    });

    // Respond with the created challenge
    res.status(201).json({
      status: "success",
      data: {
        challenge: {
          id: newChallenge._id,
          name: newChallenge.name,
          route: newChallenge.route,
          difficulty: newChallenge.difficulty,
          startPoint: newChallenge.startPoint,
          endPoint: newChallenge.endPoint,
        },
      },
    });
  } catch (err) {
    console.error("Error creating challenge:", err);
    res.status(500).json({
      status: "error",
      message: err.message || "Internal Server Error",
    });
  }
};
