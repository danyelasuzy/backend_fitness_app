import express from "express";
import {
  createChallenge,
  getAllChallenges,
  userRegisterChallenge,
} from "../controllers/challengesController.js";

const router = express.Router();

//route for challenges
router.post("/createChallenge", createChallenge);
router.get("/getAllChallenges", getAllChallenges);
router.post("/:id/register", userRegisterChallenge);

export default router;
