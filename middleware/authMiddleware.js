const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Token not found!" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decode.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Not authorized to access this resource" });
  }
});

module.exports = { protect };
// const protect = asyncHandler(async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decode = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await userModel.findById(decode.id).select("-password");
//       next();
//     } catch (error) {
//       res
//         .status(401)
//         .json({ message: "Not authorized to access this resource" });
//     }
//   }
//   if (!token) {
//     res.status(401).json({ message: "Token not found!" });
//   }
// });
