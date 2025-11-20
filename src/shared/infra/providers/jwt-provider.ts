import { env } from '@shared/config/env'
import jwt, { SignOptions } from 'jsonwebtoken'

// O payload do seu token
export type JwtPayload = {
  sub: string
  iat?: number
  exp?: number
} & Record<string, unknown>

class JwtProvider {
  private readonly secret = env.JWT_SECRET

  sign(payload: Omit<JwtPayload, 'iat' | 'exp'>, options?: SignOptions) {
    return jwt.sign(payload, this.secret, {
      expiresIn: '1h',
      ...options,
    })
  }

  verify(token: string): JwtPayload {
    return jwt.verify(token, this.secret) as JwtPayload
  }
}

export const jwtProvider = new JwtProvider()
