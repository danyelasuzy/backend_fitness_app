import Achievement from "../models/achievementModel.js";

// Create a new achievement
export const createAchievement = async (req, res) => {
  const { name, description, user, type, badge } = req.body;

  try {
    const achievement = await Achievement.create({
      name,
      description,
      user,
      type,
      badge,
    });

    res.status(201).json({
      status: "success",
      data: achievement,
    });
  } catch (err) {
    console.error("Error creating achievement:", err);
    res.status(500).json({
      status: "error",
      message: err.message || "Internal Server Error",
    });
  }
};

// Fetch all achievements for a specific user
export const getAchievementsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const achievements = await Achievement.find({ user: userId });

    if (!achievements.length) {
      return res.status(404).json({
        status: "fail",
        message: "No achievements found for this user.",
      });
    }

    res.status(200).json({
      status: "success",
      data: achievements,
    });
  } catch (err) {
    console.error("Error fetching achievements:", err);
    res.status(500).json({
      status: "error",
      message: err.message || "Internal Server Error",
    });
  }
};
