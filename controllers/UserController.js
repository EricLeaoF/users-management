class UserController {

  async index(req, res) {

  }

  async create(req, res) {
    console.log(req.body);
    var { email, name, password } = req.body

    if (email == undefined) {
      res.status(400);
      res.json({ err: "Invalid param email" })
    }

    if (name == undefined) {
      res.status(400);
      res.json({ err: "Invalid param name" })
    }

    if (password == undefined) {
      res.status(400);
      res.json({ err: "Invalid param password" })
    }
    res.send("Pegando o corpo da requisição");
  }

}

module.exports = new UserController;