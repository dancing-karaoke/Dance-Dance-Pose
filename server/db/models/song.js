const Sequelize = require('sequelize')
const db = require('../db')

const Song = db.define('song', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  artist: {
    type: Sequelize.STRING,
    allowNull: false
  },
  pitch: {
    type: Sequelize.ARRAY(Sequelize.JSON), //array
    allowNull: false
  },
  lyrics: {
    type: Sequelize.ARRAY(Sequelize.JSON), //array
    allowNull: false
  },
  beats: {
    type: Sequelize.ARRAY(Sequelize.JSON), //array
    allowNull: false
  },
  albumCover: {
    type: Sequelize.STRING,
    allowNull: false
  },
  songLink: {
    type: Sequelize.STRING,
    allowNull: false
  },
  endTime: {
    type: Sequelize.INTEGER, //time stamp maybe Sequelize.DATE
    allowNull: false
  }
})

module.exports = Song
