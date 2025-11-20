import { buildServer } from '@shared/http/http-server'
import { prisma } from '@shared/infra/database/prisma/client'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

let app: ReturnType<typeof buildServer>

describe('Authenticate User (E2E)', () => {
  beforeAll(async () => {
    app = buildServer()
    await app.ready()

    // cria usuário direto no banco antes do teste
    await prisma.user.create({
      data: {
        name: 'Junior',
        email: 'junior@e2e.com',
        password: await hash('123456', 6),
      },
    })
  })

  afterAll(async () => {
    await prisma.user.deleteMany()
    await app.close()
  })

  it('should authenticate successfully', async () => {
    const response = await request(app.server).post('/auth/login').send({
      email: 'junior@e2e.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
