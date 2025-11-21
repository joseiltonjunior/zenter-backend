import { Email } from '../value_objects/email'
import { PasswordHash } from '../value_objects/password'

interface UserProps {
  name: string
  email: Email
  passwordHash: PasswordHash
  createdAt: Date
}

export class User {
  private constructor(
    private readonly _id: string,
    private _props: UserProps,
  ) {}

  // FACTORY para novo usuário
  static createNew(props: {
    id: string
    name: string
    email: string
    passwordHash: string // hash já gerado pelo provider
  }): User {
    return new User(props.id, {
      name: props.name.trim(),
      email: Email.create(props.email),
      passwordHash: PasswordHash.create(props.passwordHash),
      createdAt: new Date(),
    })
  }

  // FACTORY para restaurar do banco
  static restore(props: {
    id: string
    name: string
    email: string
    passwordHash: string
    createdAt: Date
  }): User {
    return new User(props.id, {
      name: props.name,
      email: Email.create(props.email),
      passwordHash: PasswordHash.create(props.passwordHash),
      createdAt: props.createdAt,
    })
  }

  // GETTERS
  get id() {
    return this._id
  }

  get name() {
    return this._props.name
  }

  get email() {
    return this._props.email
  }

  get passwordHash() {
    return this._props.passwordHash
  }

  get createdAt() {
    return this._props.createdAt
  }

  // DOMÍNIO
  changeName(name: string) {
    this._props.name = name.trim()
  }

  changeEmail(email: string) {
    this._props.email = Email.create(email)
  }

  /**
   * Atualizar a senha já com hash gerado externamente.
   * O VO garante que o hash é válido.
   */
  changePasswordHash(hash: string) {
    this._props.passwordHash = PasswordHash.create(hash)
  }

  /**
   * Validação de senha deveria acontecer AQUI.
   */
  async validatePassword(
    raw: string,
    hashProvider: { compare(a: string, b: string): Promise<boolean> },
  ) {
    return hashProvider.compare(raw, this._props.passwordHash.value)
  }
}
