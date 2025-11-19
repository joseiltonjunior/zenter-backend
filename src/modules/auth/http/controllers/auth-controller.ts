import { FastifyReply, FastifyRequest } from 'fastify'

export const authController = {
  async login(req: FastifyRequest, reply: FastifyReply) {
    return { message: 'login placeholder' }
  },
}
