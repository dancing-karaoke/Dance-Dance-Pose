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
      redirect: false,
      video: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // setRedirect = () => {
  //   this.setState({
  //     redirect: true
  //   })
  // }

  // renderRedirect = () => {
  //   if (this.state.redirect) {
  //     return <Redirect to='/leaderboard' />
  //   }
  // }

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
    // this.setRedirect()
    // this.renderRedirect()
    // return <Redirect to='/leaderboard' />
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
          <div>{video}</div>

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
          {this.state.form && (
            <div>
              <form onSubmit={this.handleSubmit}>
                <label>
                  Name:
                  <input
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </label>
                <input type="submit" value="Submit" />
              </form>
              <span>{this.props.selectedSong}</span>
              <span>{this.props.level}</span>
              <span>{totalScore}!</span>
            </div>
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

{
  /*<div>
  <button type="submit">Join the Leaderboard!</button>
  <Link
    to="/leaderboard"
    onMouseOver={menuSound}
    className="modal-play-button"
    onClick={confirmSound}
  >
  See the Leaderboard
  </Link>
</div>
*/
}
