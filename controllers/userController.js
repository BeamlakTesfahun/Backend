const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const register = async (req, res) => {
  // check if all fields are added
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ error: "Please include all fields" });
  }
  // check if user already exists or not
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res.status(400).json({ error: "User already exists!" });
  }
  // hash password
  const salt = await bcrypt.genSalt(10); //generates random 10 strings
  const hashedPassword = await bcrypt.hash(password, salt);
  // create user
  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
    role,
  });
  // check if user has been created. Throw an error if it hasn't been created
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400).json({ error: "User is not created" });
  }
  //res.json({ message: "Register user" });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  // find user by email and compare if password matches
  const user = await userModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400).json({ error: "Invalid credentials" });
  }
  //res.json({ message: "Login user" });
};
const getProfile = (req, res) => {
  res.json(req.user);
};
// function to generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "20d",
  });
};
module.exports = { register, login, getProfile };
