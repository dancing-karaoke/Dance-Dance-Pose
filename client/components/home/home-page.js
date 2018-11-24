import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Navbar from './navbar'
import Wad from 'web-audio-daw'

//Notes to Team:
//-create credit component and link it here
//-create leaderboard component and link it with backend (store leaderboard on the store)
//-style this component

function playStart() {
  const menuSound = new Wad({source: '/assets/menu-select.mp3'})
  // const menuSound = new Wad({source: '/assets/game-start.ogg'})
  menuSound.play()
}

const HomePage = ({handleClick}) => (
  <div>
    <h1 className="logo">DANCE DANCE POSE</h1>
    <div>
      <Link to="/songs" onMouseOver={playStart}>
        <h3 className="sudbury"> PICK YOUR SONG </h3>
      </Link>
      <Link to="/songs" onMouseOver={playStart}>
        <h3 className="sudbury"> INSTRUCTIONS </h3>
      </Link>
      <Link to="/songs" onMouseOver={playStart}>
        <h3 className="sudbury"> LEADERBOARD </h3>
      </Link>
      <Link to="/songs" onMouseOver={playStart}>
        <h3 className="sudbury"> CREDITS </h3>
      </Link>
    </div>
  </div>
)

export default HomePage
