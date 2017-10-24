const bcrypt = require('bcrypt');

module.exports = function hashString(str, callback) {
  const saltRounds = 10;
  var salt = bcrypt.genSaltSync(saltRounds);
  const hashed = bcrypt.hashSync(str, salt)
  callback(null, hashed)

}