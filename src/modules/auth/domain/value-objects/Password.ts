export class Password {
  private readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(password: string): Password {
    if (!password || typeof password !== 'string') {
      throw new Error('Password must be a string')
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long')
    }

    return new Password(password)
  }

  getValue(): string {
    return this.value
  }
}
