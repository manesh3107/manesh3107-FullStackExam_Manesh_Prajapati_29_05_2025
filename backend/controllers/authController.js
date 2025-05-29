const User = require("../models/pgsql/user"); // PostgreSQL user model
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if email already exists
  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    return res
      .status(400)
      .json({ error: "User with this email already exists" });
  }
  console.log("Creating user:", { name, email });
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token, user });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findByEmail(email);
  if (!user) {
    return res.status(404).json({ message: "User does not exist" });
  }

  // Check if password is correct
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  // Successful login
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET
  );

  res.json({ token });
};


exports.profile = async (req, res) => {
  try {
    console.log(req.user);
    const userId = req.user.id;
    console.log("Fetching user profile for ID:", userId);

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Use findOne method
    const user = await User.findOne({ id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove password before sending response
    delete user.password;

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
