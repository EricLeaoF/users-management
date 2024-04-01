var knex = require("../database/connection");
var bcrypt = require("bcrypt");
const PasswordToken = require("./PasswordToken");

class User {

  async findAll() {
    try {
      var result = await knex.select(["id", "email", "role", "name"]).table("users");
      return result;
    } catch(err) {
      console.log(err);
      return [];
    }
  }

  async findById(id) {
    try {
      var result = await knex.select(["id", "email", "role", "name"]).where({ id: id }).table("users");
      if(result.length > 0) {
        return result[0];
      } else {
        return undefined
      }
    } catch(err) {
      console.log(err);
      return [];
    }
  }

  async findByEmail(email) {
    try {
      var result = await knex.select(["id", "email", "password", "role", "name"]).where({ email }).table("users");
      if(result.length > 0) {
        return result[0];
      } else {
        return undefined
      }
    } catch(err) {
      console.log(err);
      return [];
    }
  }

  async new(email, password, name) {
    try {
      const hash = await bcrypt.hash(password, 10);
      await knex.insert({ email, password: hash, name, role: 0}).table("users")
    } catch (err) {
      console.log(err);
    }
  }

  async findEmail(email) {
    try {
      const result = await knex.select("*").from("users").where({email: email});

      if (result.length > 0) {
        return true;
      } else {
        return false;
      }

    } catch(err) {
      console.log(err);
    }
  }

  async update(id, email, name, role) {

   const user = await this.findById(id);

   if (user) {

    const editUser = {};

    if (email) {
      if (email != user.email) {
        const result = await this.findEmail(email);
        if (!result) {
          editUser.email = email;
        } else {
          return { status: false, err: "Email is already registered" }
        }
      }
    }

    if (name) {
      editUser.name = name;
    }

    if (role) {
      editUser.role = role;
    }

    try {
      await knex.update(editUser).where({ id }).table("users")
      return { status: true }
    } catch (err) {
      return { status: false, err: err }
    }

   } else {
    return { status: false, err: "User does not exists" }
   }

  }

  async delete(id) {
    const user = await this.findById(id);
    if (user) {
      try {
        await knex.delete(user).where({ id }).table("users")
        return { status: true }
      } catch (err) {
        return { status: false, err }
      }

    } else {
      return { status: false, err: "User does not exists to be deleted" }
    }

  }

  async changePassword(newPassword, id, token) {
    const hash = await bcrypt.hash(newPassword, 10);
    await knex.update({ password: hash }).where({ id }).table("users");
    await PasswordToken.setUsed(token);
  }

}

module.exports = new User();