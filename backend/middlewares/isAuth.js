//check wheather user is authenticated or not

import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "You are not authenticated" });
    }

    const verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status(401).json({ message: "You are not authenticated" });
    }
    req.userId = verifyToken.userId;
    next();

  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

export default isAuth;