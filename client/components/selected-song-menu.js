import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const selectedSongMenu = ({hideModal, show, showModal}) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none'

  return (
    <div>
      <div>
        <button onClick={props.hideModal}>close</button>
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

export default selectedSongMenu
