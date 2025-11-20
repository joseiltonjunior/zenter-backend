import { User } from '@modules/user/domain/entities/User'

export interface AuthRepository {
  findByEmail(email: string): Promise<User | null>
}
