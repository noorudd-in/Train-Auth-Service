const { client } = require("../utils/statusCodes");
const { invalidToken } = require("../utils/htmlResponse");

const validateUserRegistration = (req, res, next) => {
  if (!req.body.full_name) {
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
        "Password must be greater than 7 letters with atleast one uppercase, one lowercase, one number and one special character.",
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

const validateVerifyEmail = (req, res, next) => {
  if (!req.query.token) {
    return res.status(client.BAD_REQUEST).send(invalidToken);
  }
  next();
};

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateVerifyEmail,
};
