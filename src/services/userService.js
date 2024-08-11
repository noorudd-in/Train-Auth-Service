const UserRepository = require("../repositories/userRepository");

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
}

module.exports = UserService;