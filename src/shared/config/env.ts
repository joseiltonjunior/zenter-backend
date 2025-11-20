import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(10),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development')
    .transform(v => (v === 'development' ? 'dev' : v)),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('❌ Invalid environment variables:')
  console.error(parsed.error.format())
  throw new Error('Environment validation error')
}

export const env = parsed.data
