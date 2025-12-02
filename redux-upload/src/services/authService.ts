// src/services/authService.ts
import * as bcrypt from 'bcryptjs';
import * as jose from 'jose';

// For development/testing only - in production, this should come from an API
const JWT_SECRET = 'your-secret-key-must-be-at-least-32-characters-long';

export interface User {
  id: number;
  email: string;
  pwd: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: { email: string };
  error?: string;
}

class AuthService {
  // Compare password with hashed password
  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  // Generate JWT token using jose (browser-compatible)
  async generateToken(email: string): Promise<string> {
    const secret = new TextEncoder().encode(JWT_SECRET);
    
    const token = await new jose.SignJWT({ email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret);
    
    return token;
  }

  // Verify JWT token
  async verifyToken(token: string): Promise<{ email: string } | null> {
    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jose.jwtVerify(token, secret);
      
      return { email: payload.email as string };
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  }

  // Login method
  async login(email: string, password: string, users: User[]): Promise<LoginResponse> {
    try {
      const user = users.find(u => u.email === email);
      
      if (!user) {
        return { 
          success: false, 
          error: 'Invalid email or password' 
        };
      }

      const isPasswordValid = await this.comparePassword(password, user.pwd);
      
      if (!isPasswordValid) {
        return { 
          success: false, 
          error: 'Invalid email or password' 
        };
      }

      const token = await this.generateToken(email);

      return {
        success: true,
        token,
        user: { email: user.email }
      };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: 'Authentication failed' 
      };
    }
  }
}

export const authService = new AuthService();