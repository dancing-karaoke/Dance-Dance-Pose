import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchLeaderboard} from '../../store'

class LeaderBoard extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getLeaderboard()
  }

  confirmSound() {
    const confirmSound = new Audio('/assets/game-start.ogg')
    confirmSound.play()
  }

  render() {
    return (
      <div>
        <h1 className="homeLogo"> LEADERBOARD</h1>

        <div className="tableContainer">
          <table id="table1" className="sudbury">
            <tbody>
              <tr id="row0">
                <td id="cell0-0">Score</td>
                <td id="cell0-1">Name</td>
                <td id="cell0-2">Song</td>
                <td id="cell0-3">Difficulty</td>
              </tr>
              {this.props.leaderboard.reverse().map(leader => {
                return (
                  <tr id="row">
                    <td id={`cell${leader.id}-0`}>{leader.score}</td>
                    <td id={`cell${leader.id}-1`}>{leader.name}</td>
                    <td id={`cell${leader.id}-2`}>{leader.song}</td>
                    <td id={`cell${leader.id}-3`}>{leader.difficulty}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <video id="background-video" loop autoPlay>
          <source src="/assets/disco-lights.mp4" type="video/mp4" />
        </video>
        <Link to="/">
          <h5 className="backButton" onClick={this.confirmSound}>
            Back
          </h5>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    leaderboard: state.leaderboard.leaderboard
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getLeaderboard: () => dispatch(fetchLeaderboard())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard)
