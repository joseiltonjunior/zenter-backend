import { FastifyInstance } from 'fastify'

import { loginRoute } from './login.route.js'

export async function registerAuthModule(app: FastifyInstance) {
  app.get('/auth/health', async () => {
    return { ok: true }
  })

  app.register(loginRoute, { prefix: '/auth' })
}
