import { randomUUID } from 'node:crypto'

import { hash } from 'bcryptjs'
import { describe, it, expect, beforeEach } from 'vitest'

import { AuthRepository } from '../../modules/user/application/repositories/user_repository'
import { AuthenticateUserUseCase } from '../../modules/user/application/use_cases/authenticate_user_use_case'
import { User } from '../../modules/user/domain/entities/user'
import { AppError } from '../../shared/errors/AppError'
import { hashProvider } from '../../shared/infra/providers/hash-provider'
import { jwtProvider } from '../../shared/infra/providers/jwt-provider'

/**
 * InMemory Repository — sem ANY
 */
class InMemoryUserRepository implements AuthRepository {
  private users: User[] = []

  async create(user: User): Promise<void> {
    this.users.push(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(u => u.email.value === email) ?? null
  }
}

/**
 * Providers inline (SEM fakes externos)
 */

let repo: InMemoryUserRepository
let sut: AuthenticateUserUseCase

describe('AuthenticateUserUseCase', () => {
  beforeEach(() => {
    repo = new InMemoryUserRepository()

    // Agora sem ANY: repo, hashProvider, jwtProvider são 100% tipados
    sut = new AuthenticateUserUseCase(repo, hashProvider, jwtProvider)
  })

  it('should authenticate when credentials are valid', async () => {
    const user = User.restore({
      id: randomUUID(),
      name: 'Junior',
      email: 'teste@teste.com',
      passwordHash: await hash('123456', 6),
      createdAt: new Date(),
    })

    await repo.create(user)

    const result = await sut.execute({
      email: 'teste@teste.com',
      password: '123456',
    })

    expect(result.token).toBeTypeOf('string')
    expect(result.token.length).toBeGreaterThan(20)
  })

  it('should throw if password is incorrect', async () => {
    const user = User.restore({
      id: randomUUID(),
      name: 'Junior',
      email: 'teste@teste.com',
      passwordHash: await hash('123456', 6),
      createdAt: new Date(),
    })

    await repo.create(user)

    await expect(
      sut.execute({
        email: 'teste@teste.com',
        password: 'errada',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
