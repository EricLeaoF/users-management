var knex = require("../database/connection");
var User = require("./User");

class PasswordToken {
  async create(email) {
     const user = await User.findByEmail(email);
     if (user) {

      try {

        const token = Date.now();
        await knex.insert({
          user_id: user.id,
          used: 0,
          token: token // Use UUID instead for better security
        }).table("password_tokens");

        return { status: true, token }

      } catch (err) {
        console.log(err);
        return { status: false, err: "Insert request failed" }
      }
     } else {
        return { status: false, err: "Email does not exist" };
     }
  }

  async validate(token) {
    try {
      const result = await knex.select().where({ token: token}).table("password_tokens");

      if (result.length > 0) {
        const tk = result[0];

        if (tk.used) {
          return { status: false };
        } else {
          return { status: true, token: tk};
        }

      } else {
        return { status: false };
      }
    } catch (err) {
      console.log(err);
      return { status: false };
    }

  }

  async setUsed(token) {
    await knex.update({ used: 1}).where({ token: token }).table("password_tokens");
  }

}

module.exports = new PasswordToken();