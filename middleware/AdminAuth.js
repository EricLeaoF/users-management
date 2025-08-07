var jwt = require('jsonwebtoken');
const secret = "abcdefghijklmnopqrstuvwxyzABCDEF"

module.exports = function(req, res, next) {
  const authToken = req.headers['authorization']
  if (authToken != undefined) {
    const bearer = authToken.split(' ');
    const token = bearer[1];

    try {
      const decoded = jwt.verify(token, secret);
      console.log(decoded);
      if (decoded.role == 1) {
        next();
      } else {
        res.status(403);
        res.send("User not authenticated");
        return;
      }
    } catch(err) {
      res.status(403);
      res.send("User not authenticated");
      return;
    }
  } else {
    res.status(403);
    res.send("User not authenticated");
    return;
  }

}