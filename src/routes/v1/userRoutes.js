const express = require("express");
const router = express.Router();

const {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUser,
  loginUser
} = require("../../controllers/userController");
const { validateUserRegistration, validateUserLogin } = require("../../middlewares/validateUser");

// Register a user
router.post("/register", validateUserRegistration, createUser);
router.post('/login', validateUserLogin, loginUser)

// Update, Delete or Fetch User details [Only for Admin]
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.get("/user/:id", getUser);
router.get("/users", getAllUser);

module.exports = router;
