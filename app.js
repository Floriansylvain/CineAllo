import express from 'express'
import logger from 'morgan'
import * as dotenv from 'dotenv'
import { indexRouter } from './routes/index.js'
import { usersRouter } from './routes/users.js'

dotenv.config()
const app = express()
const port = process.env.CINEALLO_PORT

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)
app.use('/users', usersRouter)

app.listen(port, () => console.log(`Listening on port ${port}`))