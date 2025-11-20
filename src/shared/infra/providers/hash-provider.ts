import * as bcrypt from 'bcryptjs'

class HashProvider {
  async compare(raw: string, hashed: string) {
    return bcrypt.compare(raw, hashed)
  }
}

export const hashProvider = new HashProvider()
