import React, {Component} from 'react'

class PlaySong extends Component {
  constructor() {
    super()
    this.state = {
      audio: new Audio('/adele.mp3'),
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
    console.log(this.state.audio)
    return (
      <div>
        <button onClick={this.play}>Play</button>
        <button onClick={this.pause}>Pause</button>
      </div>
    )
  }
}

export default PlaySong
