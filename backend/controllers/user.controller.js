import User from "../models/user.models.js"

export const getUserForSideBar  = async(req, res) =>{
    try {
        const LoggedInUserId = req.user._id

        const filteredUsers = await User.find({_id: {$ne: LoggedInUserId}}).select("-password")

        res.status(200).json(filteredUsers)
        
    } catch (error) {
        console.log("Error in getUserForSideBar", error.message);
        res.status(500).json({error: "Internal  Server Error in getUserForSideBar"})
    }
}