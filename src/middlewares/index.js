const {
  validateUserRegistration,
  validateUserLogin,
} = require("./validateUser");
const { isAdmin, isUser } = require("./authValidation");
module.exports = {
    validateUserRegistration,
    validateUserLogin,
    isAdmin,
    isUser
};
