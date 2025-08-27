import mongoose from "mongoose";
import User from "../modals/user.modal.js";
import uploadOnCloudinary from "../config/cloudinary.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate("posts");
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


export const editProfile = async (req,res)=>{
  try {
    const {name,userName,bio,profession,gender} = req.body
    const user =await User.findById(req.userId).select("-password")
    if(!user) return res.status(404).json({message:"User not found"})
    const sameUserWithUserName = await User.findOne({userName}).select("-password")

    if(sameUserWithUserName && sameUserWithUserName._id != req.userId) {
      return res.status(400).json({ message: "Username already taken" });
    }
    let profileImage ;
    if(req.file){
      profileImage = await uploadOnCloudinary(req.file.path)
    }
    user.name = name
    user.userName = userName
    user.bio = bio
    user.profession = profession
    user.gender = gender
    if(profileImage) {
      user.profileImage = profileImage
    }
    await user.save()
    return res.status(200).json(user)
    
  } catch (error) {
    return res.status(500).json({ message: `Edit profile error: ${error}` });
  }
}


export const getProfile = async (req, res) => {
  try {
    const userName = req.params.userName;
    const user = await User.findOne({ userName }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Get profile error: ${error}` });
  }
};