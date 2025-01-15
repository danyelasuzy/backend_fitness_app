import express from "express";
import { createChallenge } from "../controllers/challengesController.js";

const router = express.Router();

//route to create a new challenge
router.post("/createChallenge", createChallenge);

export default router;
