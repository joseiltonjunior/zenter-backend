import { AppError } from '@shared/errors/AppError'

export class Email {
  private constructor(private readonly _value: string) {}

  static create(email: string): Email {
    if (!email || typeof email !== 'string') {
      throw new AppError('Email must be a string', 400)
    }

    const normalized = email.trim().toLowerCase()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(normalized)) {
      throw new AppError('Invalid email format', 400)
    }

    return new Email(normalized)
  }

  get value() {
    return this._value
  }
}
