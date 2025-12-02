// server/services/hashPassword.js
const bcrypt = require('bcryptjs');

// Function remains the same, but we change how it is exported
async function hashPasswords(pwd) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(pwd, salt);
  return hashedPassword;
}

module.exports = { hashPasswords };