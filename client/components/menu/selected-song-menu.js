import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {selectDifficulty} from '../../store'

function menuSound() {
  const menuSound = new Audio('/assets/menu-select.mp3')
  menuSound.play()
}

function confirmSound() {
  const confirmSound = new Audio('/assets/game-start.ogg')
  confirmSound.play()
}

const SelectedSongMenu = props => {
  return (
    <div className="modal-main">
      <div id="modal-exit-button">
        <button
          onClick={() => {
            props.hideModal()
            confirmSound()
          }}
        >
          X
        </button>
      </div>
      <div>
        <h1 className="homeLogo">CHOOSE YOUR DIFFICULTY:</h1>
        <span
          onClick={() => props.selectDifficulty('easy')}
          className="modal-content"
          onMouseOver={menuSound}
          onClick={confirmSound}
        >
          EASY
        </span>
        <span
          onClick={() => props.selectDifficulty('medium')}
          className="modal-content"
          onMouseOver={menuSound}
          onClick={confirmSound}
        >
          MEDIUM
        </span>
        <span
          onClick={() => props.selectDifficulty('chaos')}
          className="modal-content"
          onMouseOver={menuSound}
          onClick={confirmSound}
        >
          CHAOS!
        </span>
      </div>
      <div>
        <Link
          to="/main"
          onMouseOver={menuSound}
          className="modal-play-button"
          onClick={confirmSound}
        >
          PLAY!
        </Link>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    selectDifficulty: difficulty => dispatch(selectDifficulty(difficulty))
  }
}

const Connect = connect(null, mapDispatchToProps)(SelectedSongMenu)

export default Connect
