var User = require("../models/User");
class UserController {

  async index(req, res) {
    const users = await User.findAll();
    res.json(users);
  }

  async findUser(req, res) {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      res.json({});
    }
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