import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient({
    adapter: {
      queryRaw: async () => ({}),
      executeRaw: async () => ({}),
      transactionContext: async () => ({
        queryRaw: async () => ({}),
        executeRaw: async () => ({}),
        commit: async () => ({}),
        rollback: async () => ({}),
      })
    } as any,
  })
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
