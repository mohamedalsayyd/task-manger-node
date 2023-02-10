const User = require("../models/User");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  res.json({ token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const tempUser = await User.findOne({ email });
  const isMatch = await bcrypt.compare(password, tempUser.password);

  if (isMatch) {
    const token = tempUser.createJWT();
    res.json({ token });
  } else {
    res.json({ msg: "incorrect email or password" });
  }
};

const getUsername = async (req, res) => {
  const user = await User.findById({ _id: req.params.id });
  res.json({ userName: user.getName() });
};

module.exports = { register, login, getUsername };
