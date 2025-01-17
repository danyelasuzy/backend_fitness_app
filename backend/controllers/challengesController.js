import { Challenge } from "../models/challengeModel.js";

//Create challenges
export const createChallenge = async (req, res) => {
  try {
    const {
      name,
      description,
      distance,
      difficulty,
      img,
      startPoint,
      endPoint,
      user,
    } = req.body;

    // Validate input
    if (
      !name ||
      !description ||
      !distance ||
      !difficulty ||
      !img ||
      !startPoint ||
      !endPoint
    ) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }

    // Check if the challenge already exists
    const existingChallenge = await Challenge.findOne({ name, user });
    if (existingChallenge) {
      return res.status(400).json({
        status: "fail",
        message: "The challenge is already created for this user",
      });
    }

    // Create a new challenge
    const newChallenge = await Challenge.create({
      name,
      description,
      distance,
      difficulty,
      img,
      startPoint,
      endPoint,
      user,
    });

    // Respond with the created challenge
    res.status(201).json({
      status: "success",
      data: {
        challenge: {
          id: newChallenge._id,
          name: newChallenge.name,
          description: newChallenge.description,
          distance: newChallenge.distance,
          difficulty: newChallenge.difficulty,
          image: newChallenge.img,
          startPoint: newChallenge.startPoint,
          endPoint: newChallenge.endPoint,
          user: newChallenge.user,
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

//Get all the challenge
export const getAllChallenges = async (req, res) => {
  try {
    // Fetch all challenges from the database
    const challenges = await Challenge.find().populate("user", "email"); // Optional: Populate user details

    // Respond with the list of challenges
    res.status(200).json({
      status: "success",
      results: challenges.length,
      data: {
        challenges,
      },
    });
  } catch (err) {
    console.error("Error fetching challenges:", err);
    res.status(500).json({
      status: "error",
      message: err.message || "Internal Server Error",
    });
  }
};

//Get a certain challenge
export const getChallenge = async (req, res) => {
  try {
    const routes = await Challenge.find();
    res.status(200).json({ status: "success", data: routes });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

//User registering to the challenge
export const userRegisterChallenge = async (req, res) => {
  try {
    const { userId } = req.body;
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res
        .status(404)
        .json({ status: "fail", message: "Challenge not found" });
    }

    const isAlreadyRegistered = challenge.registeredUsers.some(
      (user) => user.userId.toString() === userId
    );

    if (isAlreadyRegistered) {
      return res
        .status(400)
        .json({ status: "fail", message: "User already registered" });
    }

    challenge.registeredUsers.push({ userId, progress: 0 });
    await challenge.save();

    res
      .status(200)
      .json({ status: "success", message: "User registered to the challenge" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
