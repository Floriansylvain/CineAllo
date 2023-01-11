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

function pushOrderByToFilter(filter, valueOrderPair) {
	if (valueOrderPair.value === undefined) return;
	if (filter.orderBy == undefined) {
		filter.orderBy = {}
	}
	filter.orderBy[valueOrderPair.value] = valueOrderPair.order
}

function parseNumberFromQuery(query) {
	const parsedQuery = parseInt(query)
	if (isNaN(parsedQuery)) return undefined;
	return parsedQuery
}

function pushQueriesToFilter(filter, queries) {
	queries.forEach(query => {
		pushQueryToFilter(query, filter)
	})
}

showsRouter.get('/', function (req, res, next) {
	const queries = req.query
	const filter = {
		skip: parseNumberFromQuery(queries['start']) ?? 0,
		take: parseNumberFromQuery(queries['per_page']) ?? 10
	}

	pushOrderByToFilter(filter, { value: queries?.sort_asc, order: 'asc' })
	pushOrderByToFilter(filter, { value: queries?.sort_desc, order: 'desc' })

	pushQueriesToFilter(filter, [
		{ key: 'title', value: queries?.title, query: 'contains' },
		{ key: 'description', value: queries?.description, query: 'contains' },
		{ key: 'thumbmailURL', value: queries?.thumbmailURL, query: 'contains' },
		{ key: 'date', value: queries?.date, query: 'equals' },
		{ key: 'likes', value: queries?.likes, query: 'equals' }
	])

	prisma.serie.findMany(filter)
		.then(shows => res.send({
			shows,
			pagination: {
				start: filter.skip,
				per_page: filter.take
			},
			links: {
				next: `/v1/shows?start=${filter.skip + filter.take}&per_page=${filter.take}`,
				prev: `/v1/shows?start=${Math.max(0, filter.skip - filter.take)}&per_page=${filter.take}`
			},
			total: shows.length
		}))
		.catch(error => {
			if (error instanceof Prisma.PrismaClientValidationError) {
				next(createHttpError(400, 'Incorrect field in sort query: ' + error))
			}
		})
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