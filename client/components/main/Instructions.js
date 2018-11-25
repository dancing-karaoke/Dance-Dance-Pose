import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {} from '../../store/??'

class Instructions extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  confirmSound() {
    const confirmSound = new Audio('/assets/game-start.ogg')
    confirmSound.play()
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <h1 className="homeLogo"> INSTRUCTIONS</h1>
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

export default connect(mapState, mapDispatch)(Instructions)
