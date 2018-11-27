const router = require('express').Router()
const {Song} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const songs = await Song.findAll()
    res.send(songs)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.id)
    res.send(song)
  } catch (err) {
    next(err)
  }
})
