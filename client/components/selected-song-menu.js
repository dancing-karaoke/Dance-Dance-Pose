import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

//Notes to Team: i'm (Joe) still working on this...

const SelectedSongMenu = () => {
  return (
    <div>
      <div>
        {/* <button onClick={props.hideModal}>close</button>*/}
        <h1>CHOOSE DIFFICULTY</h1>
        <ul>
          <li>EASY</li>
          <li>MEDIUM</li>
          <li>CHAOS!</li>
        </ul>
      </div>

      <button>PLAY!</button>
    </div>
  )
}

export default SelectedSongMenu
