import { Email } from '@modules/user/domain/value_objects/email'
import { authRepository } from '@modules/user/infra/repositories'
import { AppError } from '@shared/errors/AppError'
import { hashProvider } from '@shared/infra/providers/hash-provider'
import { jwtProvider } from '@shared/infra/providers/jwt-provider'

import { AuthenticateUserDTO } from '../dto/authenticate_user_dto'

export class AuthenticateUserUseCase {
  constructor(
    private repo = authRepository,
    private hash = hashProvider,
    private jwt = jwtProvider,
  ) {}

  async execute(data: AuthenticateUserDTO) {
    // Apenas email é VO aqui (senha não)
    const email = Email.create(data.email)

    // Repositório recebe string (não o VO)
    const user = await this.repo.findByEmail(email.value)
    if (!user) {
      throw new AppError('Invalid credentials', 401)
    }

    // Comparação sempre usa a senha da request diretamente
    const isValid = await this.hash.compare(data.password, user.passwordHash)

    if (!isValid) {
      throw new AppError('Invalid credentials', 401)
    }

    const token = this.jwt.sign({ sub: user.id })

    return { token }
  }
}

export const authenticateUserUseCase = new AuthenticateUserUseCase()
