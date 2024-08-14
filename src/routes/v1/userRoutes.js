const express = require("express");
const router = express.Router();

const {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUser,
  loginUser,
  getProfile,
} = require("../../controllers/userController");

const {
  validateUserLogin,
  validateUserRegistration,
  isAdmin,
  isUser
} = require("../../middlewares/index");

// Register & Login a user
router.post("/register", validateUserRegistration, createUser);
router.post("/login", validateUserLogin, loginUser);

// Fetch user profile (after authentication)
router.get("/profile/:id", isUser, getProfile);

// Update, Delete or Fetch User details [Only for Admin]
router.patch("/user/:id", isAdmin, updateUser);
router.delete("/user/:id", isAdmin, deleteUser);
router.get("/user/:id", isAdmin, getUser);
router.get("/users", isAdmin, getAllUser);

module.exports = router;
