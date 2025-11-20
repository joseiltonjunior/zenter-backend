import { Email } from '../value-objects/Email'

export class User {
  public readonly id: string
  public readonly name: string
  public readonly email: Email
  public readonly passwordHash: string
  public readonly createdAt: Date

  constructor(props: {
    id: string
    name: string
    email: Email
    passwordHash: string
    createdAt: Date
  }) {
    this.id = props.id
    this.name = props.name
    this.email = props.email
    this.passwordHash = props.passwordHash
    this.createdAt = props.createdAt
  }
}
