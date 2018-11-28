const router = require('express').Router()
const sequelize = require('sequelize')
const {Leaderboard} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const scores = await Leaderboard.findAll({
      order: sequelize.col('score')
      // order: [sequelize.fn('max', sequelize.col('score')), 'DESC']
      // order: sequelize.literal('max(score) DESC')
    })
    res.send(scores)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newLeader = {
      name: req.body.name,
      score: req.body.score,
      difficulty: req.body.difficulty,
      song: req.body.song
    }
    res.send(await Leaderboard.create(newLeader))
  } catch (err) {
    next(err)
  }
})
