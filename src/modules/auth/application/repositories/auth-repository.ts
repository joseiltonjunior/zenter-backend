import { User } from '@modules/auth/domain/entities/User'
import { Email } from '@modules/auth/domain/value-objects/Email'

export interface AuthRepository {
  findByEmail(email: Email): Promise<User | null>
}
