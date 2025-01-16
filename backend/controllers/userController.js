import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "./email.js";

// User Registration
export const userRegister = async (req, res) => {
  try {
    const { name, email, age, location, password, confirmPassword } = req.body;

    // Validate input
    if (!name || !email || !age || !location || !password || !confirmPassword) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "fail",
        message: "Password and confirm password do not match",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "Email is already registered",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      age,
      location,
      password: hashedPassword, // Only store the hashed password
    });

    // Respond with the created user (excluding the password)
    res.status(201).json({
      status: "success",
      data: {
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          age: newUser.age,
          location: newUser.location,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message || "Internal Server Error",
    });
  }
};

// User Login
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Email and password are required",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    // Compare passwords
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      status: "success",
      token,
      data: {
        user: userWithoutPassword,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message || "Internal server error",
    });
  }
};

export const forgotPassword = async (req, res, next) => {
  //Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "There is no user with that email address",
    });
  }

  //Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //Send it back as an email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new passowrd and passwordConfirm to: ${resetURL}, \nIf you didn't forget your password, please ignore this email.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 mins)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    console.error("Email Sending Error:", err);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    res.status(500).json({
      status: "error",
      message: "There was an error sending the email. Try again later!",
    });
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    // 1. Hash the token to find it in the database
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // 2. Find the user by the hashed token and check if the token is not expired
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }, // Check expiration
    });

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Token is invalid or has expired",
      });
    }

    // 3. Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "fail",
        message: "Passwords do not match",
      });
    }

    // 4. Update the password and clear reset token fields
    user.password = await bcrypt.hash(password, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({
      status: "success",
      message: "Password has been reset successfully!",
    });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({
      status: "error",
      message: err.message || "Internal Server Error",
    });
  }
};
