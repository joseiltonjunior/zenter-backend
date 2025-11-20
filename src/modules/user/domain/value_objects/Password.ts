import { AppError } from '@shared/errors/AppError'

export class PasswordHash {
  private constructor(private readonly _value: string) {}

  static create(hash: string): PasswordHash {
    if (!hash || typeof hash !== 'string') {
      throw new AppError('Invalid password hash', 500)
    }

    // Hashes do bcrypt começam com "$2a$" ou "$2b$"
    if (!hash.startsWith('$2')) {
      throw new AppError('Invalid password hash format', 500)
    }

    return new PasswordHash(hash)
  }

  get value() {
    return this._value
  }

  equals(other: PasswordHash): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }
}
