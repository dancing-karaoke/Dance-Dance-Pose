import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {} from '../../store/??'

class LeaderBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  confirmSound() {
    const confirmSound = new Audio('/assets/game-start.ogg')
    confirmSound.play()
  }

  render() {
    const dataColumns = ['Name', 'Score']

    return (
      <div>
        <h1 className="homeLogo"> LEADERBOARD</h1>

        <div className="tableContainer">
          <table id="table1" className="sudbury">
            <tbody>
              <tr id="row0">
                <td id="cell0-0">Rank</td>
                <td id="cell0-1">Name</td>
                <td id="cell0-2">Score</td>
              </tr>
              <tr id="row1">
                <td id="cell1-0">1</td>
                <td id="cell1-1">Jimmy</td>
                <td id="cell1-2">3000</td>
              </tr>
              <tr id="row2">
                <td id="cell2-0">2</td>
                <td id="cell2-1">Jimmy</td>
                <td id="cell2-2">2000</td>
              </tr>
              <tr id="row2">
                <td id="cell2-0">3</td>
                <td id="cell2-1">Jimmy</td>
                <td id="cell2-2">1000</td>
              </tr>
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

const mapState = state => ({})

const mapDispatch = {}

export default connect(mapState, mapDispatch)(LeaderBoard)
