import genToken from "../config/token.js";
import User from "../modals/user.modal.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, userName } = req.body;
    const findByEmail = await User.findOne({ email });
    if (findByEmail) {
      return res.status(401).json({ message: "Email Already exist" });
    }
    const findByUserName = await User.findOne({ userName });
    if (findByUserName) {
      return res
        .status(401)
        .json({ message: "UserName Already exist choose different name :)" });
    }
    if(password.length < 6){
        return res.status(401).json({ message: "Password must be at least 6 characters long" });
    }


    //hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    //saving detail user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      userName,
    });

    //generating token and store it in cookies
    const token = await genToken(user._id);
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 2 * 365 * 24 * 60 * 60 * 1000,
        secure:false,
        sameSite:"Strict"
      })
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: `signup error : ${error}`, error });
  }
};


export const signIn = async (req, res) => {
  try {
    const {password, userName } = req.body;
    // console.log("ekhm",req.body);
    
    const user = await User.findOne({ userName });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found" });
    }

    //compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password is incorrect" });
    }
    const token = await genToken(user._id);
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 2 * 365 * 24 * 60 * 60 * 1000,
        secure:false,
        sameSite:"Strict"
      })
    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({ message:`signin error : ${error}` });
  }
};

export const signOut = async (req,res)=>{
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"SignOut Successfully"})
    } catch (error) {
        return res.status(500).json({ message: "SignOut Error", error });
    }
}