import { Progress } from "../models/progressModel.js";

export const getLeaderboard = async (req, res) => {
  const { challengeId } = req.params;

  try {
    const leaderboard = await Progress.find({ challengeId })
      .populate("userId", "name")
      .sort({ kilometers: -1 }) // Sort by kilometers in descending order
      .limit(10); // Get the top 10

    res.status(200).json({
      status: "success",
      data: leaderboard,
    });
  } catch (err) {
    console.error("Error fetching leaderboard:", err);
    res.status(500).json({
      status: "error",
      message: err.message || "Internal Server Error",
    });
  }

  //Timeframe for leaderboard
  const timeframe = req.query.timeframe;
  let dateFilter = {};

  if (timeframe === "weekly") {
    dateFilter = {
      lastUpdated: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    };
  } else if (timeframe === "monthly") {
    dateFilter = {
      lastUpdated: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    };
  }

  const leaderboard = await Progress.find({ challengeId, ...dateFilter })
    .populate("userId")
    .sort({ kilometers: -1 })
    .limit(10);
};
