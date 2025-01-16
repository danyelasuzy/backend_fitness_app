import express from "express";
import { getLeaderboard } from "../controllers/leaderboardController.js";

const router = express.Router();

// Route to get leaderboard for a specific challenge
router.get("/:challengeId", getLeaderboard);

export default router;
