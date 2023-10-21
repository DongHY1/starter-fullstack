import cors from 'cors'
import express from 'express'

import { morganMiddleware } from '@/middlewares/morgan'
import { userRouter } from '@/routes/user'
import { logger } from '@/utils/logger'

const app = express()

app.use(morganMiddleware)
app.use(cors())

app.use('/user', userRouter)

app.use('/', (req, res) => {
  logger.info('user request main page')
  res.end('Hello')
})

app.listen(3000, () => {
  logger.info('App is listen on 3000')
})
