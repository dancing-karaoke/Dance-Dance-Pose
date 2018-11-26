import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

//Notes to Team:
//-create credit component and link it here
//-create leaderboard component and link it with backend (store leaderboard on the store)

function menuSound() {
  const menuSound = new Audio('/assets/menu-select.mp3')
  menuSound.play()
}

function confirmSound() {
  const confirmSound = new Audio('/assets/game-start.ogg')
  confirmSound.play()
}

const HomePage = ({handleClick}) => (
  <div>
    <h1 className="homeLogo">* DANCE DANCE POSE *</h1>
    <div>
      <Link to="/songs" onMouseOver={menuSound} onClick={confirmSound}>
        <h3 className="sudbury"> PICK YOUR SONG </h3>
      </Link>
      <Link to="/instructions" onMouseOver={menuSound} onClick={confirmSound}>
        <h3 className="sudbury"> INSTRUCTIONS </h3>
      </Link>
      <Link to="/leaderboard" onMouseOver={menuSound} onClick={confirmSound}>
        <h3 className="sudbury"> LEADERBOARD </h3>
      </Link>
      <Link to="/credits" onMouseOver={menuSound} onClick={confirmSound}>
        <h3 className="sudbury"> CREDITS </h3>
      </Link>
      <video id="background-video" loop autoPlay muted>
        <source src="/assets/disco-lights.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
)

export default HomePage
