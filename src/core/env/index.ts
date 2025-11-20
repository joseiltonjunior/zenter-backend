import 'dotenv/config'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing in .env')
}

export const env = {
  databaseUrl: process.env.DATABASE_URL!,
}
