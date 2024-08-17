const { client } = require("../utils/statusCodes");
const UserService = require("../services/userService");
const userService = new UserService();

const isAdmin = async (req, res, next) => {
  // First check if authToken is provided.
  if (!req.headers.authtoken) {
    return res.status(client.UNAUTHORISED).json({
      data: null,
      message: "Session Expired or auth not provided.",
      success: false,
      error: "Unauthenticated",
    });
  }

  // If authToken is present, verify the token
  const userObject = userService.verifyToken(req.headers.authtoken);
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
      message: "User not found.",
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

  // If user exist, verify userid passed same as of authtoken.
  const userCred =
    req.body.id ?? req.body.email ?? req.params.id ?? req.params.email;
  if (userCred != user.id && userCred != user.email && user.role == "user") {
    return res.status(client.FORBIDDEN).json({
      data: null,
      message: "Unauthorized user.",
      success: false,
      error: "Unauthorized",
    });
  }

  next();
};

module.exports = {
  isAdmin,
  isUser,
};
