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

  async edit(req, res) {
    const { id, name, role, email } = req.body;
    const result = await User.update(id, email, name, role);
    if (result) {
      if (result.status) {
        res.send("Success");
      } else {
        res.status(500);
        res.send(result.err);
      }
    } else {
        res.status(500);
        res.send("Server error");
    }
  }

  async remove(req, res) {
    const id = req.params.id;

    const result = await User.delete(id);

    if (result.status) {
      res.send("Success");
    } else {
      res.status(406);
      res.send(result.err);
    }

  }
  

}

module.exports = new UserController;