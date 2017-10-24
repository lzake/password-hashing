const passwordHash = require('password-hash');

module.exports = function hashString(str, callback) {
  const hashed = passwordHash.generate(str)
  callback(null, hashed)
}