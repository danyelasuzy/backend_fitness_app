import express from "express";
import {
  createChallenge,
  getAllChallenges,
  getChallenge,
  userRegisterChallenge,
} from "../controllers/challengesController.js";

const router = express.Router();

//route for challenges
router.post("/createChallenge", createChallenge);
router.get("/getAllChallenges", getAllChallenges);
router.get("/challenge", getChallenge);
router.post("/api/challenges/:id/register", userRegisterChallenge);

export default router;
