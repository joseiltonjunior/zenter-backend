import { prisma } from '@infra/prisma/prisma'
import bcrypt from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import jwt from 'jsonwebtoken'

export async function loginRoute(app: FastifyInstance) {
  app.post('/login', async (req, reply) => {
    const { email, password } = req.body as { email: string; password: string }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return reply.status(401).send({ error: 'Invalid credentials' })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return reply.status(401).send({ error: 'Invalid credentials' })

    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' })

    return reply.send({ token })
  })
}
