const { User } = require("../models/index");

class UserRepository {
  async createUser(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in the repository layer");
      console.log(error);
    }
  }

  async updateUser(userId, data) {
    try {
      const user = await User.update(data, {
        where: {
          id: userId,
        },
      });
      return user;
    } catch (error) {
      console.log("Something went wrong in the repository layer");
      console.log(error);
    }
  }

  async deleteUser(userId) {
    try {
      const user = await User.destroy({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      console.log("Something went wrong in the repository layer");
      console.log(error);
    }
  }

  async getUser(userId) {
    try {
      const user = await User.findByPk(userId);
      return user;
    } catch (error) {
      console.log("Something went wrong in the repository layer");
      console.log(error);
    }
  }

  async getAllUser() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      console.log("Something went wrong in the repository layer");
      console.log(error);
    }
  }
}

module.exports = UserRepository;