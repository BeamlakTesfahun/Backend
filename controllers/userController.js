const register = (req, res) => {
  res.json({ message: "Register user" });
};
const login = (req, res) => {
  res.json({ message: "Login user" });
};
const getProfile = (req, res) => {
  res.json({ message: "User profile" });
};
module.exports = { register, login, getProfile };
