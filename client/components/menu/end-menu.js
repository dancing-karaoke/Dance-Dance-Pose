import React, {Component, Form} from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {updateLeaderboard, addPlayerLeaderboard} from '../../store'
import axios from 'axios'

function menuSound() {
  const menuSound = new Audio('/assets/menu-select.mp3')
  menuSound.play()
}

function confirmSound() {
  const confirmSound = new Audio('/assets/game-start.ogg')
  confirmSound.play()
}

class EndMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: false,
      name: '',
      video: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  showForm = () => {
    this.setState({form: true, video: false})
  }

  hideForm = () => {
    this.setState({form: false})
  }

  handleChange(event) {
    this.setState({name: event.target.value})
  }

  handleSubmit(event) {
    let totalScore = this.props.danceScore + this.props.singScore
    let playerData = {
      name: this.state.name,
      score: totalScore,
      difficulty: this.props.level,
      song: this.props.selectedSong
    }
    event.preventDefault()
    this.props.addPlayerLeaderboard(playerData)
    this.setState({name: ''})
    this.props.history.push('/leaderboard')
  }

  render() {
    let totalScore = this.props.danceScore + this.props.singScore

    const video = this.state.video ? (
      <video
        className="baby-video"
        src="/assets/end-dance.mov"
        autoPlay
        muted
        loop
      />
    ) : (
      <h1 />
    )

    return (
      <div className="modal-main">
        <div>
          <h1 className="homeLogo">Good Job!</h1>

          {!this.state.form && (
            <div>
              {video}
              {totalScore > 100000 && (
                <span
                  onClick={() => {
                    confirmSound()
                    this.showForm()
                  }}
                  className="modal-content"
                  onMouseOver={menuSound}
                >
                  Enter your score into the leaderboard
                </span>
              )}
              <Link
                to="/songs"
                onMouseOver={menuSound}
                className="modal-play-button"
                onClick={confirmSound}
              >
                <span className="modal-content-confirm">PLAY AGAIN!</span>
              </Link>
            </div>
          )}

          {this.state.form && (
            <div>
              <form onSubmit={this.handleSubmit} className="modal-form">
                <label className="modal-form-input">
                  Name:
                  <input
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </label>
                <button
                  type="submit"
                  className="modal-form-confirm"
                  onClick={confirmSound}
                >
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singScore: state.bubble.singScore,
    danceScore: state.bubble.danceScore,
    level: state.song.level,
    selectedSong: state.song.selectedSong
  }
}

const mapDispatchToProps = {addPlayerLeaderboard}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EndMenu))
