import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export const indexRouter = express.Router()

indexRouter.get('/', async (req, res, next) => {
	res.send({message:"voila ton index"})
})

indexRouter.get('/articles', async (req, res, next) => {
	const articles = await prisma.article.findMany({})
	res.send({
		message:"voila tes articles",
		articles
	})
})
