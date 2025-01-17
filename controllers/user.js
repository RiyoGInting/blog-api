const jwt = require('jsonwebtoken');
const { User } = require('../models');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

// Register User
const registerUser = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) return res.status(400).json({ message: 'Email already in use' });

    const user = await User.create(req.body);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await user.isValidPassword(password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
  res.json({ token });
};

module.exports = { registerUser, loginUser };
