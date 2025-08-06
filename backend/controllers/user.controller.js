import userModal from "../modals/user.modal.js";

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId
        const user = await userModal.findById(userId)
        if(!user)return res.status(404).json({message:"User not found"})
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: `current user error: ${error}` });
    }
};