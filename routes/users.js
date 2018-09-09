var express = require('express');
var router = express.Router();

const User = require('../models/user');
const Crawler = require('../models/crawler');

/**
 * Create
 */
router.post('/users', (req, res, next) => {

  let data = req.body || {}

  User.create(data)
    .then(user => {
      res.send(200, user)
      next()
    })
    .catch(err => {
      res.send(500, err)
    })

});

/**
 * Read
 */
router.get('/users/:userId', (req, res, next) => {

  User.findById(req.params.userId)
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
 * List
 */
router.get('/users', (req, res, next) => {
  
  let query = req.params || {};

  User.findOne(query)
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
 * Update
 */
router.put('/users/:userId', (req, res, next) => {

  let data = req.body || {},
    opts = {
      new: true
    }

  User.findByIdAndUpdate({ _id: req.params.userId }, data, opts)
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
router.delete('/users/:userId', (req, res, next) => {

  const userId = req.params.userId

  User.findOneAndRemove({ _id: userId })
    .then((user) => {

      if (!user) {
        res.send(404)
        next()
      }

      // remove associated crawlers to avoid orphaned data
      Crawler.deleteMany({ userId: userId })
        .then(() => {
          res.send(204)
          next()
        })
        .catch(err => {
          res.send(500, err)
        })
    })
    .catch(err => {
      res.send(500, err)
    })
})

module.exports = router;