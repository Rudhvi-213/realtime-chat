import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt_token;

    if (!token) {
      console.log(token);
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: "Unauthorized - User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute: ", error.message);
    res.status(500).json({ error: "Internal protectRoute Server Error" });
  }
};

export default protectRoute;
