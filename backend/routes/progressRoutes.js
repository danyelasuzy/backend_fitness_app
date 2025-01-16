import express from "express";
import {
  createProgress,
  updateProgress,
} from "../controllers/progressControllers.js";

const router = express.Router();

// Route to create progress
router.post("/createProgress", createProgress);

// Route to update progress
router.patch("/updateProgress", updateProgress);

export default router;
