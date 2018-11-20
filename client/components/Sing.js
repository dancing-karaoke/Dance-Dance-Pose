import React, {Component} from 'react'
import Wad from 'web-audio-daw'

class Sing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trackingPitch: false,
      score: 0,
      currentNote: 'waiting for song to start',
      currentTime: 0,
      adeleNotes: {
        0.5: 'waiting for song to start',
        1: 'waiting for song to start',
        1.5: 'waiting for song to start',
        2: 'waiting for song to start',
        2.5: 'waiting for song to start',
        3: 'A',
        3.5: 'D',
        4: 'E',
        4.5: 'E',
        5: 'E',
        5.5: 'C',
        6: 'C',
        6.5: 'C',
        7: 'C',
        7.5: 'A',
        8: 'A',
        8.5: 'A',
        9: 'D',
        9.5: 'E',
        10: 'C'
      }
      // song: new Wad({source: '/adele.mp3'})
    }
    this.pitchLogger = this.pitchLogger.bind(this)
    this.handlePitchLogger = this.handlePitchLogger.bind(this)
  }

  handlePitchLogger() {
    this.setState({trackingPitch: true}, function() {
      this.pitchLogger()
    })
  }

  pitchLogger = () => {
    if (this.state.trackingPitch === true) {
      let voice = new Wad({source: 'mic'}) // At this point, your browser will ask for permission to access your microphone.
      let tuner = new Wad.Poly()
      let song = this.props.song

      song.play()

      let currentTime = tuner.destination.context.currentTime.toFixed(1)
      console.log(song.destination.context.currentTime - currentTime)

      tuner.setVolume(0) // If you're not using headphones, you can eliminate microphone feedback by muting the output from the tuner.
      tuner.add(voice)

      voice.play() // You must give your browser permission to access your microphone before calling play().
      tuner.updatePitch() // The tuner is now calculating the pitch and note name of its input 60 times per second. These values are stored in <code>tuner.pitch</code> and <code>tuner.noteName</code>.

      let results = {}

      let logPitch = () => {
        requestAnimationFrame(logPitch)

        if (
          (tuner.destination.context.currentTime.toFixed(1) - currentTime) %
            0.5 ===
            0 &&
          tuner.destination.context.currentTime.toFixed(1) - currentTime > 0
        ) {
          let time =
            tuner.destination.context.currentTime.toFixed(1) - currentTime ||
            tuner.destination.context.currentTime.toFixed(0) - currentTime
          this.setState({currentTime: time})

          let note
          if (!results[time]) {
            tuner.noteName
              ? (note = tuner.noteName[0])
              : (note = 'no note detected')
            results[time] = note
            this.setState({currentNote: note})
            if (
              results[time] === this.state.adeleNotes[time] &&
              results[time] !== undefined
            ) {
              this.setState(prevState => ({
                score: prevState.score + 1
              }))
            }
          }
        }
      }
      logPitch()
    }
    // tuner.stopUpdatingPitch(); // Stop calculating the pitch if you don't need to know it anymore.
  }

  render() {
    return (
      <div
        style={{
          position: 'absolute',
          bottom: 450,
          left: 40
        }}
      >
        <div>
          <button onClick={this.handlePitchLogger}> Start Game </button>
          <p>Current Note: {this.state.currentNote}</p>
          <p>Score: {this.state.score}</p>
          <p>Current Time: {this.state.currentTime}</p>
          <p>Target Note: {this.state.adeleNotes[this.state.currentTime]}</p>
        </div>
      </div>
    )
  }
}

export default Sing
