import { FastifyInstance } from 'fastify'

import { authController } from '../controllers/authenticate_user_controller'
import { authenticateUserSchema } from '../schemas/authenticate_user_schema'

export async function authRoutes(app: FastifyInstance) {
  app.post(
    '/login',
    {
      schema: authenticateUserSchema,
    },
    authController.login,
  )
}
