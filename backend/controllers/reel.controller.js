
import Reel from "../modals/reel.modal.js";
import User from "../modals/user.modal.js";

export const uploadReel = async (req, res) => {
  try {
    const { caption } = req.body;
    let media;
    if (req.file) {
      media = await uploadOnCloudinary(req.file.path);
    } else {
      return res.status(400).json({ message: "Media file is required" });
    }
    const reel = await Reel.create({
      caption,
      media,
      author: req.userId, // fixed
    });

    const user = await User.findById(req.userId);

    user.reel.push(reel._id);
    await user.save();
    const populatedReel = await Reel.findById(reel._id).populate(
      "author",
      "name userName profileImage"
    );
    return res
      .status(201)
      .json({ message: "Reel created successfully", reel: populatedReel });
  } catch (error) {
    return res.status(500).json({ message: "upload Reel error" });
  }
};

export const like = async (req, res) => {
  try {
    const reelId = req.params.id;
    const reel = await Reel.findById(reelId);
    if (!reel) return res.status(404).json({ message: "Reel not found" });
    const alreadyLiked = reel.likes.some(
      (id) => id.toString() == req.userId.toString()
    );
    if (alreadyLiked) {
      reel.likes = reel.likes.filter(
        (id) => id.toString() != req.userId.toString()
      );
    } else {
      reel.likes.push(req.userId);
    }
    await reel.save();
    await reel.populate("author", "name userName profileImage");
    return res.status(200).json(reel);
  } catch (error) {
    return res.status(500).json({ message: " Reel like server error" });
  }
};

export const comment = async (req, res) => {
  try {
    const { message } = req.body;
    const reelId = req.params.reelId;
    const reel = await Reel.findById(reelId);
    if (!reel) return res.status(404).json({ message: "Reel not found" });
    reel.comments.push({ author: req.userId, message });
    await reel.save();
    await reel.populate("author", "name userName profileImage");
    await reel.populate("comments.author");
    return res.status(200).json(reel);
  } catch (error) {
    return res.status(500).json({ message: "comment Reel server error" });
  }
};

export const getAllReels = async (req, res) => {
  try {
    const reels = await Reel.find({}).populate(
      "author",
      "name userName profileImage"
    ).populate("comments.author");
    return res.status(200).json(reels);
  } catch (error) {
    return res.status(500).json({ message: "Internal Reel server error" });
  }
};
