import { env } from '@shared/config/env'
import jwt from 'jsonwebtoken'

class JwtProvider {
  sign(payload: object) {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: '1h',
    })
  }
}

export const jwtProvider = new JwtProvider()
