import { Email } from '@modules/auth/domain/value-objects/Email'
import { Password } from '@modules/auth/domain/value-objects/Password'
import { authRepository } from '@modules/auth/infra/repositories'
import { AppError } from '@shared/errors/AppError'
import { hashProvider } from '@shared/infra/providers/hash-provider'
import { jwtProvider } from '@shared/infra/providers/jwt-provider'

import { AuthenticateUserDTO } from '../dto/authenticate-user-dto'

export class AuthenticateUserUseCase {
  constructor(private repo = authRepository) {}

  async execute(data: AuthenticateUserDTO) {
    const emailVO = Email.create(data.email)
    const passwordVO = Password.create(data.password)

    const user = await this.repo.findByEmail(emailVO)
    if (!user) throw new AppError('Invalid credentials', 401)

    const isValid = await hashProvider.compare(passwordVO.getValue(), user.passwordHash)

    if (!isValid) throw new AppError('Invalid credentials', 401)

    const token = jwtProvider.sign({ sub: user.id })

    return { token }
  }
}

export const authenticateUserUseCase = new AuthenticateUserUseCase()
