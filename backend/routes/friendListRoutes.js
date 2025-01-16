import express from "express";
import {
  addFriend,
  getFriendList,
  updateFriendStatus,
  removeFriend,
} from "../controllers/friendListController.js";

const router = express.Router();

// Route to add a friend
router.post("/addFriend", addFriend);

// Route to get a user's friend list
router.get("/:userId", getFriendList);

// Route to update friend status
router.patch("/updateFriendStatus", updateFriendStatus);

// Route to remove a friend
router.delete("/removeFriend", removeFriend);

export default router;
