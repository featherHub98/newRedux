const bcrypt = require('bcryptjs');
const jose = require('jose');

const JWT_SECRET = 'this-is-a-very-secret-key-change-me'; 
const secret = new TextEncoder().encode(JWT_SECRET);

async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

async function generateToken(email) {
  const token = await new jose.SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
  
  return token;
}


module.exports = { comparePassword, generateToken };