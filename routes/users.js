import express from 'express'

export const usersRouter = express.Router()

usersRouter.get('/', function(req, res, next) {
	res.send({message:"voila tes users"})
})
