const Sequelize = require('sequelize')
const db = require('../db')

const Leaderboard = db.define('leaderboard', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    set(name) {
      return this.setDataValue('name', name.slice(0, 3))
    }
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
  }
})

module.exports = Leaderboard
