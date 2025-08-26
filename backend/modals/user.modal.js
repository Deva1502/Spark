import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    bio:{
      type: String,
    },
    profession: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId, //jab kisi model ko type banate hai
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    saved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    reel: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reel",
      },
    ],
    story: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
      },
    ],
    resetOtp: {
      type: String,
    },
    otpExpires:{
      type:Date
    },
    isOtpVerified: {
      type: Boolean,
      default: false,
    },
    
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
