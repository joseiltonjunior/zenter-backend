import { FastifyInstance } from 'fastify'

import { authController } from '../controllers/authenticate_user_controller'

export async function authRoutes(app: FastifyInstance) {
  app.post('/login', authController.login)
}
