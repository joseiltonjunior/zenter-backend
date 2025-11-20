import { Email } from '../value_objects/email'

interface UserProps {
  name: string
  email: Email
  passwordHash: string
  createdAt: Date
}

export class User {
  private constructor(
    private readonly _id: string,
    private _props: UserProps,
  ) {}

  // FACTORY PARA CRIAR NOVO USUÁRIO
  static createNew(props: { id: string; name: string; email: string; passwordHash: string }): User {
    return new User(props.id, {
      name: props.name,
      email: Email.create(props.email),
      passwordHash: props.passwordHash,
      createdAt: new Date(),
    })
  }

  // FACTORY PARA RESTAURAR DO BANCO (SEM VALIDAR)
  static restore(props: {
    id: string
    name: string
    email: string
    passwordHash: string
    createdAt: Date
  }): User {
    return new User(props.id, {
      name: props.name,
      email: Email.create(props.email), // você pode trocar isso para Email.restore() se quiser ignorar validações
      passwordHash: props.passwordHash,
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

  // COMPORTAMENTO DO DOMÍNIO
  changeName(name: string) {
    this._props.name = name.trim()
  }

  changeEmail(email: string) {
    this._props.email = Email.create(email)
  }

  changePasswordHash(hash: string) {
    this._props.passwordHash = hash
  }
}
