import FriendList from "../models/friendListModel.js";

//Add friend
export const addFriend = async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    // Find the user's friend list
    let friendList = await FriendList.findOne({ user: userId });

    if (!friendList) {
      // Create a new friend list if it doesn't exist
      friendList = await FriendList.create({ user: userId, friends: [] });
    }

    // Check if the friend already exists
    const existingFriend = friendList.friends.find(
      (friend) => friend.friend.toString() === friendId
    );

    if (existingFriend) {
      return res
        .status(400)
        .json({ message: "Friend already added or pending." });
    }

    // Add the new friend
    friendList.friends.push({ friend: friendId });
    await friendList.save();

    res.status(200).json({
      status: "success",
      message: "Friend added successfully.",
      data: friendList,
    });
  } catch (err) {
    console.error("Error adding friend:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

//Get friendlist
export const getFriendList = async (req, res) => {
  const { userId } = req.params;

  try {
    const friendList = await FriendList.findOne({ user: userId }).populate(
      "friends.friend",
      "name email"
    );

    if (!friendList) {
      return res.status(404).json({ message: "Friend list not found." });
    }

    res.status(200).json({
      status: "success",
      data: friendList,
    });
  } catch (err) {
    console.error("Error fetching friend list:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

//update FriendStatus
export const updateFriendStatus = async (req, res) => {
  const { userId, friendId, status } = req.body;

  try {
    const friendList = await FriendList.findOne({ user: userId });

    if (!friendList) {
      return res.status(404).json({ message: "Friend list not found." });
    }

    const friend = friendList.friends.find(
      (f) => f.friend.toString() === friendId
    );

    if (!friend) {
      return res.status(404).json({ message: "Friend not found." });
    }

    friend.status = status;
    await friendList.save();

    res.status(200).json({
      status: "success",
      message: "Friend status updated successfully.",
      data: friendList,
    });
  } catch (err) {
    console.error("Error updating friend status:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

//Remove Friends
export const removeFriend = async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    const friendList = await FriendList.findOne({ user: userId });

    if (!friendList) {
      return res.status(404).json({ message: "Friend list not found." });
    }

    friendList.friends = friendList.friends.filter(
      (friend) => friend.friend.toString() !== friendId
    );

    await friendList.save();

    res.status(200).json({
      status: "success",
      message: "Friend removed successfully.",
      data: friendList,
    });
  } catch (err) {
    console.error("Error removing friend:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
};
