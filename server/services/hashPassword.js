
const bcrypt = require('bcryptjs');

async function hashPasswords(pwd) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(pwd, salt);
  return hashedPassword;
}

module.exports = { hashPasswords };