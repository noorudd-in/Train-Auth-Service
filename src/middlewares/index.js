const {
  validateUserRegistration,
  validateUserLogin,
  validateVerifyEmail,
  validateResendEmailVerify
} = require("./validateUser");
const { isAdmin, isUser } = require("./authValidation");
module.exports = {
    validateUserRegistration,
    validateUserLogin,
    isAdmin,
    isUser,
    validateVerifyEmail,
    validateResendEmailVerify
};
