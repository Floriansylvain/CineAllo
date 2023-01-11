import express from 'express'
import { Prisma, PrismaClient } from '@prisma/client'
import createHttpError from 'http-errors'

const prisma = new PrismaClient()
export const showsRouter = express.Router()

function pushQueryToFilter(filter, keyValueQuery) {
	if (keyValueQuery.value === undefined) return;
	if (filter.where == undefined) {
		filter.where = {}
	}

	filter.where[keyValueQuery.key] = {
		[keyValueQuery.query]: keyValueQuery.query === 'contains' ?
			keyValueQuery.value.toString() : parseInt(keyValueQuery.value)
	}
}

showsRouter.get('/', function (req, res, next) {
	const filter = {
		orderBy: {
			likes: 'desc'
		}
	}

	const queries = req.query
	pushQueryToFilter(filter, { key: 'title', value: queries?.title, query: 'contains' })
	pushQueryToFilter(filter, { key: 'description', value: queries?.description, query: 'contains' })
	pushQueryToFilter(filter, { key: 'thumbmailURL', value: queries?.thumbmailURL, query: 'contains' })
	pushQueryToFilter(filter, { key: 'date', value: queries?.date, query: 'equals' })
	pushQueryToFilter(filter, { key: 'likes', value: queries?.likes, query: 'equals' })

	prisma.serie.findMany(filter)
		.then(shows => res.send({ shows }))
})

showsRouter.get('/:id', function (req, res, next) {
	prisma.serie.findUniqueOrThrow({
		where: {
			title: req.params.id
		}
	})
		.then(show => res.send({ show }))
		.catch(error => {
			if (error instanceof Prisma.NotFoundError) {
				next(createHttpError(404, 'Show not found.'))
			}
		})
})

showsRouter.post('/', function (req, res, next) {
	prisma.serie.create({
		data: {
			title: req.body.title,
			date: req.body.date,
			description: req.body.description,
			thumbmailURL: req.body.thumbmailURL
		}
	})
		.then(() => res.send({ message: 'Show posted!' }))
		.catch(() => {
			next(createHttpError(400, 'Check your show model/content.'))
		})
})

showsRouter.patch('/:id/like/', function (req, res, next) {
	prisma.serie.update({
		where: {
			title: req.params.id
		},
		data: {
			likes: {
				increment: 1
			}
		}
	})
		.then(() => res.send({ message: 'Show liked!' }))
		.catch(() => {
			next(createHttpError(400, 'Show not found.'))
		})
})