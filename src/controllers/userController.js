const UserService = require("../services/userService");
const { success, client, server } = require("../utils/statusCodes");

const userService = new UserService();

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    if (user.success == false) {
      return res.status(server.INTERNAL_SERVER_ERROR).json({
        data: null,
        success: false,
        message: user.message,
        error: user.error,
      });
    }
    return res.status(success.CREATED).json({
      data: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone_number: user.phone_number,
      },
      success: true,
      message: "User created successfully. You can login now.",
      error: {},
    });
  } catch (error) {
    res.status(server.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      message: "Cannot create a user.",
      error: { error },
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user || user[0] == 0) {
      return res.status(client.NOT_FOUND).json({
        data: user,
        success: false,
        message: "User you want to update, doesn't exist!",
        error: {},
      });
    }
    return res.status(success.CREATED).json({
      data: user,
      success: true,
      message: "User updated successfully.",
      error: {},
    });
  } catch (error) {
    res.status(server.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      message: "Cannot update a user.",
      error: { error },
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    if (!user) {
      return res.status(client.NOT_FOUND).json({
        data: null,
        success: false,
        message: "The user you want to delete doesn't exist!",
        error: {},
      });
    }
    return res.status(success.CREATED).json({
      data: user,
      success: true,
      message: "User deleted successfully.",
      error: {},
    });
  } catch (error) {
    res.status(server.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      message: "Cannot delete a user.",
      error: { error },
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userService.getUser(req.params.id);
    if (!user) {
      return res.status(client.NOT_FOUND).json({
        data: user,
        success: false,
        message: "User you specified doesn't exist!",
        error: {},
      });
    }
    return res.status(success.OK).json({
      data: user,
      success: true,
      message: "User fetched successfully.",
      error: {},
    });
  } catch (error) {
    res.status(server.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      message: "Cannot fetch a user.",
      error: { error },
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const user = await userService.getAllUser();
    return res.status(success.OK).json({
      data: user,
      success: true,
      message: "All users fetched successfully.",
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(server.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      message: "Cannot fetch users.",
      error: error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.body.email);
    if (!user) {
      return res.status(client.UNAUTHORISED).json({
        data: {},
        success: true,
        message: "Email or password is incorrect.",
        error: "User is not authenticated.",
      });
    }
    const checkPassword = userService.verifyPassword(
      req.body.password,
      user.password
    );
    
    if (!checkPassword) {
      return res.status(client.UNAUTHORISED).json({
        data: {},
        success: true,
        message: "Email or password is incorrect.",
        error: "User is not authenticated.",
      });
    }
    const authToken = userService.createToken({
      id: user.id,
      email: user.email,
    });
    return res.status(success.OK).json({
      data: {
        id: user.id,
        email: user.email,
        authToken: authToken,
      },
      success: true,
      message: "User logged in successfully.",
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(server.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      message: "Cannot login user.",
      error: error,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await userService.getUser(req.params.id);
    if (!user) {
      return res.status(client.NOT_FOUND).json({
        data: null,
        success: false,
        message: "User you specified doesn't exist!",
        error: {},
      });
    }
    return res.status(success.OK).json({
      data: {
        id: user.id,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role
      },
      success: true,
      message: "User fetched successfully.",
      error: {},
    });
  } catch (error) {
    res.status(server.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      message: "Cannot fetch the user.",
      error: error,
    });
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUser,
  loginUser,
  getProfile
};
