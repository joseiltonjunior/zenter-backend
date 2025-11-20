import { authRoutes } from '@modules/user/infra/http/routes/auth.routes'
import Fastify from 'fastify'

import { authMiddleware } from './middlewares/auth-middleware'
import { errorMiddleware } from './middlewares/error-middleware'

export function buildServer() {
  const app = Fastify({ logger: true })

  // Register public routes
  app.register(authRoutes, { prefix: '/auth' })
  app.get('/crash', () => {
    throw new Error('explodiu')
  })
  app.get('/health', { preHandler: [authMiddleware] }, async () => ({ ok: true }))

  // Example: protected routes registration
  // If you have a set of routes that must be protected, register them with preHandler:
  // app.register(protectedRoutes, { prefix: '/users', preHandler: [authMiddleware] })

  // Or protect individual route inside route file:
  // app.post('/private', { preHandler: [authMiddleware] }, handler)

  // Register error handler (must be set after routes registration)
  app.setErrorHandler(errorMiddleware)

  return app
}
