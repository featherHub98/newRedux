// server/services/authService.js
const bcrypt = require('bcryptjs');
const jose = require('jose');
const util = require('util');

// For development/testing only - in production, this should come from environment variables
const JWT_SECRET = 'your-secret-key-must-be-at-least-32-characters-long'; 
const secret = new TextEncoder().encode(JWT_SECRET);

// Compare password with hashed password
async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

// Generate JWT token using jose
async function generateToken(email) {
  const token = await new jose.SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
  
  return token;
}

// We only export the essential functions for the server routes to use
module.exports = { comparePassword, generateToken };