import mongoose from "mongoose";
import User from "../modals/user.modal.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `current user error: ${error}` });
  }
};

export const suggestedUsers = async (req, res) => {
  try {
    const currentUserId = new mongoose.Types.ObjectId(req.userId);

    const users = await User.find({ _id: { $ne: currentUserId } }).select(
      "-password"
    );
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: `suggested users error: ${error}` });
  }
};
