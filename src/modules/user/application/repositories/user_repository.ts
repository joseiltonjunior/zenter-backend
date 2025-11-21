import { User } from '@modules/user/domain/entities/user'

export interface AuthRepository {
  findByEmail(email: string): Promise<User | null>
}
