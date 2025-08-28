import uploadOnCloudinary from "../config/cloudinary.js";
import Story from "../modals/story.modal.js";
import User from "../modals/user.modal.js";

export const uploadStory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.story) {
      //deleting that story
      await Story.findByIdAndDelete(user.story);
      user.story = null;
    }
    const { mediaType } = req.body;
    let media;
    if (req.file) {
      media = await uploadOnCloudinary(req.file.path);
    } else {
      return res.status(400).json({ message: "Media file is required" });
    }
    const story = await Story.create({
      author: req.user.id,
      media,
      mediaType,
    });
    user.story = story._id;
    await user.save();
    const populatedStory = await Story.findById(story._id)
      .populate("author", "name userName profileImage")
      .populate("viewers", "name userName profileImage");
    return res.status(201).json(populatedStory);
  } catch (error) {
    return res.status(500).json({ message: "uploading story failed" });
  }
};

export const viewStory = async (req, res) => {
  try {
    const storyId = req.params.storyId;
    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    const viewersIds = story.viewer.map((id) => id.toString());
    if (!viewersIds.includes(req.userId.toString())) {
      story.viewer.push(req.userId);
      await story.save();
    }
    const populatedStory = await Story.findById(story._id)
      .populate("author", "name userName profileImage")
      .populate("viewers", "name userName profileImage");
    return res.status(200).json(populatedStory);
  } 
  catch (error) {
    return res.status(500).json({ message: "Viewing story failed" });
  }
};


export const getStoryByUserName = async (req,res)=>{
    try {
        const userName = req.params.userName;
        const user = await User.findOne({userName})
        if(!user)return res.status(404).json({message:"User not found"})
        const story = await Story.find({
            author: user._id
        }).populate("viewers author");
        return res.status(200).json(story);
    } catch (error) {
        return res.status(500).json({ message: "Fetching story failed" });
    }
}
