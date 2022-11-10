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
