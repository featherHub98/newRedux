const bcrypt = require('bcryptjs');
const jose = require('jose');

const JWT_SECRET = 'your-secret-key-must-be-at-least-32-characters-long'; 
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
  console.log('Generated Token:', token);
  return token;
}
async function verifyToken(token) {
  try {
    const { payload } = await jose.jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error('Token verification error:', error.message);
    throw new Error('Invalid or expired token');
  }
}


module.exports = { comparePassword, generateToken,verifyToken };