const router = require('express').Router()
const {Leaderboard} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const scores = await Leaderboard.findAll()
    res.send(scores)
  } catch (err) {
    next(err)
  }
})
