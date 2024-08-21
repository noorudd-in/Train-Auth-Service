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
  verifyEmail,
  resendEmail
} = require("../../controllers/userController");

const {
  validateUserLogin,
  validateUserRegistration,
  isAdmin,
  isUser,
  validateVerifyEmail,
  validateResendEmailVerify
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

// Verify Email Address
router.get('/verify-email', validateVerifyEmail, verifyEmail)
// Resend Email Verification
router.post('/resend-verification-email', validateResendEmailVerify, resendEmail)

module.exports = router;
