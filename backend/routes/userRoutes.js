import express from "express";
import {
  userLogin,
  userRegister,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";

const router = express.Router();

// User registration route
router.post("/register", userRegister);
router.post("/login", userLogin);

router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

export default router;
