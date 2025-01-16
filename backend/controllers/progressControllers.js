import { Progress } from "../models/progressModel.js";

//Add progress
export const createProgress = async (req, res) => {
  const { userId, challengeId, kilometers } = req.body;

  try {
    // Check if progress already exists for this user and challenge
    const existingProgress = await Progress.findOne({ userId, challengeId });

    if (existingProgress) {
      return res.status(400).json({
        status: "fail",
        message: "Progress for this challenge already exists.",
      });
    }

    // Create new progress record
    const newProgress = await Progress.create({
      userId,
      challengeId,
      kilometers: kilometers || 0,
    });

    res.status(201).json({
      status: "success",
      data: newProgress,
    });
  } catch (err) {
    console.error("Error creating progress:", err);
    res.status(500).json({
      status: "error",
      message: err.message || "Internal Server Error",
    });
  }
};

//updateProgress
export const updateProgress = async (req, res) => {
  const { userId, challengeId, kilometers } = req.body;

  try {
    // Find the progress record
    const progress = await Progress.findOne({ userId, challengeId });

    if (!progress) {
      return res.status(404).json({
        status: "fail",
        message: "Progress not found.",
      });
    }

    progress.kilometers += kilometers;
    progress.lastUpdated = Date.now();
    await progress.save();

    res.status(200).json({
      status: "success",
      data: progress,
    });
  } catch (err) {
    console.error("Error updating progress:", err);
    res.status(500).json({
      status: "error",
      message: err.message || "Internal Server Error",
    });
  }
};
