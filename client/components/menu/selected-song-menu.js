import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {selectDifficulty} from '../../store'

//Notes to Team: i'm (Joe) still working on this...

const SelectedSongMenu = props => {
  return (
    <div>
      <div>
        <button onClick={props.hideModal}>close</button>
        <h1>CHOOSE YOUR DIFFICULTY:</h1>
        <button type="button" onClick={() => props.selectDifficulty('easy')}>
          EASY
        </button>
        <button type="button" onClick={() => props.selectDifficulty('medium')}>
          MEDIUM
        </button>
        <button type="button" onClick={() => props.selectDifficulty('chaos')}>
          CHAOS!
        </button>
      </div>
      <Link to="/main">PLAY!</Link>
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
