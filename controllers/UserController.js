var User = require("../models/User");
class UserController {

  async index(req, res) {

  }

  async create(req, res) {
    console.log(req.body);
    var { email, name, password } = req.body

    if (email == undefined) {
      res.status(400);
      res.json({ err: "Invalid param email" })
      return;
    }

    const emailExists = await User.findEmail(email);

    if (emailExists) {
      res.status(406);
      res.json({ err: "Email already exists" })
      return;
    }

    if (name == undefined) {
      res.status(400);
      res.json({ err: "Invalid param name" })
      return;
    }

    if (password == undefined) {
      res.status(400);
      res.json({ err: "Invalid param password" })
      return;
    }

    await User.findEmail(email);

    await User.new(email, password, name);

    res.status(200);
    res.send("Pegando o corpo da requisição");
  }

}

module.exports = new UserController;