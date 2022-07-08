var Crypto = require('crypto-js');

function hashPassword (p) {
  return Crypto.SHA256(p).toString();
}

function AES_Encrypt(text, key) {
  var encrypted = Crypto.AES.encrypt(text, key);
  return encrypted.toString();
}

function AES_Decrypt(encrypted, key) {
  var decrypted = Crypto.AES.decrypt(encrypted, key);
  return decrypted.toString(Crypto.enc.Utf8);
}

export { hashPassword, AES_Encrypt, AES_Decrypt }