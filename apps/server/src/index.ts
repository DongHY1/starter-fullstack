import { inferAsyncReturnType, initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import cors from 'cors'
import express from 'express'
import { z } from 'zod'

import { morganMiddleware } from '@/middlewares/morgan'
import { userRouter } from '@/routes/user'
import { logger } from '@/utils/logger'

interface ChatMessage {
  user: string
  message: string
}

const messages: ChatMessage[] = [
  { user: 'user1', message: 'Hello' },
  { user: 'user2', message: 'Hi' }
]

const app = express()

const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({ req, res }) // no context
type Context = inferAsyncReturnType<typeof createContext>

const t = initTRPC.context<Context>().create()
const router = t.router
const publicProcedure = t.procedure

const appRouter = router({
  greeting: publicProcedure.query(() => 'Hello from tRPC!'),
  getMessages: publicProcedure.input(z.number().default(10)).query(({ input }) => messages.slice(-input)), // get last 10 messages w.r.t default input
  addMessage: publicProcedure
    .input(
      z.object({
        user: z.string(),
        message: z.string()
      })
    )
    .mutation(({ input }) => {
      messages.push(input)
      return input
    })
})

export type AppRouter = typeof appRouter

app.use(morganMiddleware)
app.use(cors())

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
  })
)

app.use('/user', userRouter)

app.use('/', (req, res) => {
  logger.info('user request main page')
  res.end('Hello')
})

app.listen(3000, () => {
  logger.info('App is listen on 3000')
})
