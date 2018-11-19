import React, {Component} from 'react'
// import testSong from '../../public/songs/adele.mp3'

class PlaySong extends Component {
  constructor() {
    super()
    this.state = {
      // audio: new Audio(testSong),
      play: false,
      pause: false
    }
  }

  play = () => {
    this.setState({play: true, pause: false})
    this.state.audio.play()
  }

  pause = () => {
    this.setState({play: false, pause: true})
    this.state.audio.pause()
  }

  render() {
    return (
      <div>
        <button onClick={this.play}>Play</button>
        <button onClick={this.pause}>Pause</button>
      </div>
    )
  }
}

export default PlaySong
