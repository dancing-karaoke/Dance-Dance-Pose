import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {selectLevel} from '../../store'

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
        <h1 className="homeLogo">CHOOSE YOUR Level:</h1>
        <span
          onClick={() => {
            props.selectLevel('easy')
            confirmSound()
          }}
          className="modal-content"
          onMouseOver={menuSound}
        >
          EASY
        </span>
        <span
          onClick={() => {
            props.selectLevel('medium')
            confirmSound()
          }}
          className="modal-content"
          onMouseOver={menuSound}
        >
          MEDIUM
        </span>
        <span
          onClick={() => {
            props.selectLevel('chaos')
            confirmSound()
          }}
          className="modal-content"
          onMouseOver={menuSound}
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
    selectLevel: level => dispatch(selectLevel(level))
  }
}
export default connect(null, mapDispatchToProps)(SelectedSongMenu)
