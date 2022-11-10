import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export const showsRouter = express.Router()

showsRouter.get('/', async function(req, res, next) {
	const articles = await prisma.serie.findMany()

	res.send({articles})
})

showsRouter.get('/:id', async function(req, res, next) {
	const articles = await prisma.serie.findMany({
		where: {
			title: {
				contains: req.params.id
			}
		}
	})

	res.send({articles})
})

showsRouter.post('/', async function (req, res, next) {
	try {
		res.send(await prisma.serie.create({
			data: {
				title: req.body.title,
				date: req.body.date,
				description: req.body.description,
				thumbmailURL: req.body.thumbmailURL
			}
		}))
	} catch (error) {
		res.send({error, message: "You might want to check your Show data format / content."})
	}
})

