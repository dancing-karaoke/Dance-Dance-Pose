const Sequelize = require('sequelize')
const db = require('../db')

const Leaderboard = db.define('leaderboard', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  difficulty: {
    type: Sequelize.STRING,
    allowNull: false
  },
  song: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rank: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Leaderboard
