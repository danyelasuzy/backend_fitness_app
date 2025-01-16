import express from "express";
import {
  createChallenge,
  getAllChallenges,
} from "../controllers/challengesController.js";

const router = express.Router();

//route for challenges
router.post("/createChallenge", createChallenge);
router.get("/getAllChallenges", getAllChallenges);

export default router;
