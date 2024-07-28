/**
 * Import necessary modules.
 * express: Web framework for Node.js.
 * mongoose: MongoDB object modeling tool.
 * bcrypt: Library to hash passwords.
 * bodyParser: Middleware to parse request bodies.
 * jwt: Library to create JSON Web Tokens for authentication.
 */
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

// Initialize Express application
const app = express();
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON request bodies

/**
 * Connect to MongoDB database using mongoose.
 * The connection string specifies the database 'myapp' on the localhost.
 */
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });

/**
 * Define a User schema for MongoDB using mongoose.
 * The schema includes an email and password, both required and with the email being unique.
 */
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Create a User model from the schema
const User = mongoose.model('User', UserSchema);

/**
 * Registration route handler.
 * Expects 'email' and 'password' in the request body.
 * Hashes the password and saves the new user to the database.
 * Responds with status 201 on success or status 400 on error.
 */
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt factor of 10
  const newUser = new User({ email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * Login route handler.
 * Expects 'email' and 'password' in the request body.
 * Checks if the user exists and if the password is correct.
 * Responds with a JSON Web Token on successful authentication or an error message on failure.
 */
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send('User not found');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).send('Invalid password');
  }
  const token = jwt.sign({ userId: user._id }, 'your_jwt_secret'); // Generate a JWT token
  res.send({ token });
});

// Start the Express server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});