import express from 'express'
import logger from 'morgan'
import * as dotenv from 'dotenv'
import { showsRouter } from './routes/shows.js'

dotenv.config()
const app = express()
const port = process.env.CINEALLO_PORT

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/v1/', async (req, res, next) => {
	res.send({ message: "CineAllo v1.0" })
})

app.use('/v1/shows', showsRouter)

app.listen(port, () => console.log(`Listening on port ${port}`))