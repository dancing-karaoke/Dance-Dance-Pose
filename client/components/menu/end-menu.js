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
    const multiplier =
      this.props.level === 'easy'
        ? 1
        : this.props.level === 'medium' ? 1.25 : 1.5
    const totalScore =
      multiplier * (this.props.danceScore + this.props.singScore)

    const playerData = {
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
    const multiplier =
      this.props.level === 'easy'
        ? 1
        : this.props.level === 'medium' ? 1.25 : 1.5
    const totalScore =
      multiplier * (this.props.danceScore + this.props.singScore)

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
          <div>{video}</div>
          {!this.state.form && (
            <div>
              {totalScore > 80000 && (
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
                PLAY AGAIN!
              </Link>
            </div>
          )}
          {this.state.form && (
            <div>
              <form onSubmit={this.handleSubmit} className="form-content">
                <label className="name-content">
                  Name:
                  <input
                    type="text"
                    placeholder="3 Characters Limit"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </label>
                <button
                  type="submit"
                  className="modal-submit-confirm"
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
