const { client } = require("../utils/statusCodes");
const UserService = require("../services/userService");
const userService = new UserService();

const validateUserRegistration = (req, res, next) => {
  if (!req.body.fullName) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Full name is required.",
      success: false,
      error: "Invalid request.",
    });
  }
  if (!req.body.email) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Email is required.",
      success: false,
      error: "Invalid request.",
    });
  }
  if (!req.body.password) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Password is required.",
      success: false,
      error: "Invalid request.",
    });
  }
  if (!req.body.phone_number) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Phone number is required.",
      success: false,
      error: "Invalid request.",
    });
  }
  if (req.body.fullName.length < 3) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Full name cannot be less than 3 characters.",
      success: false,
      error: "Invalid request.",
    });
  }
  if (!req.body.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Email is invalid.",
      success: false,
      error: "Invalid request.",
    });
  }
  if (
    !req.body.password.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    )
  ) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message:
        "Password must be greater than 7 letters with atleast one uppercase, one lowercase, one number and one special chracter.",
      success: false,
      error: "Invalid request.",
    });
  }
  if (String(req.body.phone_number).length != 10) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Phone number must be 10 digits",
      success: false,
      error: "Invalid request.",
    });
  }

  next();
};

const validateUserLogin = (req, res, next) => {
  if (!req.body.email) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Email is required.",
      success: false,
      error: "Invalid request.",
    });
  }
  if (!req.body.password) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Password is required.",
      success: false,
      error: "Invalid request.",
    });
  }

  next();
};

const isAdmin = async (req, res, next) => {
  // First check if authToken is provided.
  if (!req.body.authToken) {
    return res.status(client.UNAUTHORISED).json({
      data: null,
      message: "Session Expired. Login again.",
      success: false,
      error: "Unauthenticated",
    });
  }

  // If authToken is present, verify the token
  const userObject = userService.verifyToken(req.body);
  if (!userObject.data) {
    return res.status(client.UNAUTHORISED).json({
      data: null,
      message: "Invalid Token",
      success: false,
      error: userObject.error,
    });
  }

  // If token is valid, verify if the user exist
  const user = await userService.getUser(userObject.data.id);
  if (!user) {
    return res.status(client.UNAUTHORISED).json({
      data: null,
      message: "Session Expired. Login again.",
      success: false,
      error: "Unauthenticated",
    });
  }

  // If user exist, verify user is admin.
  if (user.role != "admin") {
    return res.status(client.FORBIDDEN).json({
      data: null,
      message: "Unauthorized user.",
      success: false,
      error: "Unauthorized",
    });
  }

  next();
};

const isUser = async (req, res, next) => {
  // First check if authToken is provided.
  if (!req.headers.authtoken) {
    return res.status(client.UNAUTHORISED).json({
      data: null,
      message: "Session Expired. Login again.",
      success: false,
      error: "Unauthenticated",
    });
  }

  // If authToken is present, verify the token
  const userObject = await userService.verifyToken(req.headers.authtoken);
  if (!userObject.data) {
    return res.status(client.UNAUTHORISED).json({
      data: null,
      message: "Invalid Token",
      success: false,
      error: userObject.error,
    });
  }

  // If token is valid, verify if the user exist
  const user = await userService.getUser(userObject.data.id);
  if (!user) {
    return res.status(client.UNAUTHORISED).json({
      data: null,
      message: "Session Expired. Login again.",
      success: false,
      error: "Unauthenticated",
    });
  }

  const userCred = req.body.id ?? req.body.email ?? req.params.id ?? req.params.email
  if (userCred != user.id && userCred != user.email && user.role == 'user') {
    return res.status(client.FORBIDDEN).json({
      data: null,
      message: "Unauthorized user.",
      success: false,
      error: "Unauthorized",
    });
  }

  next()
}

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  isAdmin,
  isUser
};
