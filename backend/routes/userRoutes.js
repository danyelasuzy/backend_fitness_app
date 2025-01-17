import express from "express";
import {
  userLogin,
  userRegister,
  forgotPassword,
  resetPassword,
  getUserChallenge,
} from "../controllers/userController.js";

const router = express.Router();

// User registration route
router.post("/register", userRegister);
router.post("/login", userLogin);

router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);
router.get("/:userId/currentChallenge", getUserChallenge);

export default router;
