import { defineConfig } from '@prisma/config'
import * as dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  earlyAccess: true,
  datasource: {
    provider: 'postgresql',
    url: process.env.DATABASE_URL,
  },
})
