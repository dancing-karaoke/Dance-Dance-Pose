import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Navbar from './navbar'

//Notes to Team:
//-create difficulty component and link it here
//-create leaderboard component and link it with backend (store leaderboard on the store)
//-style this component

const HomePage = ({handleClick}) => (
  <div>
    <Navbar />
    <h1>DANCE DANCE POSE</h1>
    <div>
      <Link to="/songs">PICK YOUR SONG</Link>
      <h3>SET DIFFICULTY</h3>
      <h3>LEADERBOARD</h3>
    </div>
  </div>
)

export default HomePage
