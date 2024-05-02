import jwt from "jsonwebtoken";

const generateJwtToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  console.log(token);
  res.cookie("jwt_token", token);
};

export default generateJwtToken;
