import express from "express";
import {
  createAchievement,
  getAchievementsByUser,
} from "../controllers/achievementController.js";

const router = express.Router();

// Route to create an achievement
router.post("/create", createAchievement);

// Route to get all achievements for a specific user
router.get("/user/:userId", getAchievementsByUser);

export default router;
