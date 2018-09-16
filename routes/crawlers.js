const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Crawler = require('../models/crawler');
const crawlersManager = require('../helpers/crawlersManager');
 
/**
 * Create
 */
router.post('/users/:userId/crawlers', (req, res, next) => {

	let data = Object.assign({}, { userId: req.params.userId }, req.body) || {}

	User.findById(req.params.userId)
		.then(user => {

			if (!user) {
				res.send(404)
				next()
			}

			Crawler.create(data)
				.then(crawler => {
					crawlersManager.start(crawler);
					res.send(200, crawler)
					next()
				})
				.catch(err => {
					res.send(500, err)
				})

		}).catch(err => {
			res.send(500);
		})

})

/**
 * List
 */
router.get('/users/:userId/crawlers', (req, res, next) => {

	let limit = parseInt(req.query.limit, 10) || 10, // default limit to 10 docs
		skip  = parseInt(req.query.skip, 10) || 0, // default skip to 0 docs
		query = req.params || {}

	// remove skip and limit from data to avoid false querying
	delete query.skip
	delete query.limit

	Crawler.find({ userId: req.params.userId }).skip(skip).limit(limit)
		.then(tasks => {

			res.send(200, tasks)
			next()

		})
		.catch(err => {
			res.send(500, err)
		})

})

/**
 * Get
 */
router.get('/users/:userId/crawlers/:crawlerId', (req, res, next) => {

	Crawler.findOne({ userId: req.params.userId, _id: req.params.crawlerId })
		.then(crawler => {

			if (!crawler) {
				res.send(404)
				next()
			}

			res.send(200, crawler)
			next()

		})
		.catch(err => {
			res.send(500, err)
		})

})

/**
 * Update
 */
router.put('/users/:userId/crawlers/:crawlerId', (req, res, next) => {

	let data = req.body || {},
		opts = {
			new: true
		}

	Crawler.update({ userId: req.params.userId, _id: req.params.crawlerId }, data, opts)
		.then(user => {

			if (!user) {
				res.send(404)
				next()
			}

			res.send(200, user)
			next()

		})
		.catch(err => {
			res.send(500, err)
		})

})

/**
 * Delete
 */
router.delete('/users/:userId/crawlers/:crawlerId', (req, res, next) => {

	Crawler.findOneAndRemove({ userId: req.params.userId, _id: req.params.crawlerId })
		.then((crawler) => {

			if (!crawler) {
				res.send(404)
				next()
			}

			crawlersManager.stop(crawler);
			res.send(204)
			next()

		})
		.catch(err => {
			res.send(500, err)
		})

})

module.exports = router;