import { FastifyInstance } from 'fastify'

import { authController } from '../controllers/auth_controller'

export async function authRoutes(app: FastifyInstance) {
  app.post('/login', authController.login)
}
