const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserRepository = require("../repositories/userRepository");
const { JWT_PRIVATE_KEY } = require("../config/constants");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data) {
    try {
      const user = await this.userRepository.createUser(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      console.log(error);
    }
  }

  async updateUser(userId, data) {
    try {
      const user = await this.userRepository.updateUser(userId, data);
      return user;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      console.log(error);
    }
  }

  async deleteUser(userId) {
    try {
      const user = await this.userRepository.deleteUser(userId);
      return user;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      console.log(error);
    }
  }

  async getUser(userId) {
    try {
      const user = await this.userRepository.getUser(userId);
      return user;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      console.log(error);
    }
  }

  async getAllUser() {
    try {
      const users = await this.userRepository.getAllUser();
      return users;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      console.log(error);
    }
  }

  async getUserByEmail(userEmail) {
    try {
      const user = await this.userRepository.getUserByEmail(userEmail);
      return user;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      console.log(error);
    }
  }

  verifyPassword = (plainPassword, hashPassword) => {
    try {
      return bcrypt.compareSync(plainPassword, hashPassword);
    } catch (error) {
      console.log("Password matching failed!");
      console.log(error);
    }
  };

  createToken = (userObject) => {
    try {
      const authToken = jwt.sign(userObject, JWT_PRIVATE_KEY, {
        expiresIn: "3d",
      });
      return authToken;
    } catch (error) {
      console.log("Token cannot be generated.");
      console.log(error);
    }
  };

  verifyToken = (data) => {
    try {
      const userObject = jwt.verify(data, JWT_PRIVATE_KEY);
      return { data: userObject, error: null };
    } catch (error) {
      console.log("Cannot verify token");
      return { data: null, error: error };
    }
  };
}

module.exports = UserService;
