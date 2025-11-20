export class Email {
  private readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(email: string): Email {
    if (!email || typeof email !== 'string') {
      throw new Error('Email must be a string')
    }

    const normalized = email.trim().toLowerCase()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(normalized)) {
      throw new Error('Invalid email format')
    }

    return new Email(normalized)
  }

  getValue(): string {
    return this.value
  }
}
