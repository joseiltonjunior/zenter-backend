import { FastifyInstance } from 'fastify'

import { authController } from './controllers/auth-controller'

export function registerAuthModule(app: FastifyInstance) {
  app.get('/auth/health', async () => {
    return { ok: true }
  })

  app.post('/auth/login', authController.login)
}
