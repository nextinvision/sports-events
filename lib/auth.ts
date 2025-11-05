import jwt, { SignOptions } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET: string = process.env.JWT_SECRET || 'your-secret-key'
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '7d'

export interface JWTPayload {
  userId: string
  email: string
  role: string
}

export function generateToken(payload: JWTPayload): string {
  if (!JWT_SECRET || JWT_SECRET === 'your-secret-key') {
    throw new Error('JWT_SECRET is not configured')
  }
  
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as SignOptions)
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    return null
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

