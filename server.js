import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import userRoutes from "./backend/routes/userRoutes.js";
import challengeRoutes from "./backend/routes/challengeRoutes.js";
import friendListRoutes from "./backend/routes/friendListRoutes.js";
import progressRoutes from "./backend/routes/progressRoutes.js";
import leaderboardRoutes from "./backend/routes/leaderboardRoutes.js";
import achievementRoute from "./backend/routes/achievementRoute.js";

dotenv.config();

// MongoDB connection
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.error("Not connected:", err));

mongoose.set("strictPopulate", false);

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Replace this with  frontend URL
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow specific HTTP methods
  })
);

app.use(
  "/challengesImages",
  express.static(path.join(__dirname, "/assets/challengesImages"))
);

app.options("*", cors());

app.use(express.json());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Use user routes
app.use("/api/users", userRoutes);

//Use challenge routes
app.use("/api/challenges", challengeRoutes);

//Attach friends routes
app.use("/api/friends", friendListRoutes);

//Use progress routes
app.use("/api/progress", progressRoutes);

//Use leaderboard routes
app.use("/api/leaderboard", leaderboardRoutes);

// Use achievement routes
app.use("/api/achievements", achievementRoute);

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the API!",
  });
});

// Test Email Route
app.post("/test-email", async (req, res) => {
  try {
    await sendEmail({
      email: "ezraart89@gmail.com",
      subject: "Test Email",
      message: "This is a test email.",
    });
    res.status(200).send("Email sent!");
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).send("Failed to send email.");
  }
});

// Catch-all for unhandled routes
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("ERROR 💥", err.stack);
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "Test route works!" });
});

// Start server
const PORT = process.env.PORT || 3000 || 5000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
