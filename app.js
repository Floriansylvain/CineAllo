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

app.get('/', async (req, res, next) => {
	res.send({message:"voila ton index"})
})
app.use('/shows', showsRouter)

app.listen(port, () => console.log(`Listening on port ${port}`))