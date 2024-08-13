const express = require("express");
const router = express.Router();

const {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUser,
  loginUser,
  getProfile
} = require("../../controllers/userController");
const { validateUserRegistration, validateUserLogin, isUser } = require("../../middlewares/validateUser");

// Register & Login a user
router.post("/register", validateUserRegistration, createUser);
router.post('/login', validateUserLogin, loginUser)

// Fetch user profile (after authentication)
router.get('/profile/:id', isUser, getProfile);

// Update, Delete or Fetch User details [Only for Admin]
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.get("/user/:id", getUser);
router.get("/users", getAllUser);

module.exports = router;
