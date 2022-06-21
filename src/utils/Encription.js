function hashPassword (p) {
  var crypto = require('crypto-js');
  return crypto.SHA256(p).toString();
}

export { hashPassword }