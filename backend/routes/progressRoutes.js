import express from "express";
import {
  createProgress,
  updateProgress,
  getProgressByUser,
  deleteProgress,
} from "../controllers/progressController.js";

const router = express.Router();

// Route to create progress
router.post("/create", createProgress);

// Route to update progress
router.patch("/update", updateProgress);

export default router;
