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
      },
      syncData: [
        [
          {start: '3', end: '5', text: 'I'},
          {start: '5', end: '5.5', text: 'heard'},
          {start: '6.5', end: '7', text: 'that'},
          {start: '7', end: '7.5', text: 'you'},
          {start: '8', end: '9.5', text: 'settled'},
          {start: '9.5', end: '10', text: 'down', finalWord: true}
        ],
        [
          {start: '10.5', end: '11', text: 'that'},
          {start: '12', end: '13', text: 'you'},
          {start: '13', end: '14', text: 'found'},
          {start: '14', end: '15', text: 'a'},
          {start: '16', end: '17', text: 'girl'},
          {start: '17', end: '18', text: 'and'},
          {start: '18', end: '19', text: "you're"},
          {start: '19', end: '20', text: 'married', finalWord: true}
        ]
      ]
    }
    this.pitchLogger = this.pitchLogger.bind(this)
    this.handlePitchLogger = this.handlePitchLogger.bind(this)
    this.createSubtitle = this.createSubtitle.bind(this)
  }

  handlePitchLogger() {
    this.setState({trackingPitch: true}, function() {
      this.pitchLogger()
    })
  }

  createSubtitle = () => {
    let fakeTime = this.props.song.destination.context.currentTime
    let subtitles = document.getElementById('subtitles')
    let element

    let currentSection = 0

    for (let i = 0; i < this.state.syncData[currentSection].length; i++) {
      element = document.createElement('span')
      element.innerText = this.state.syncData[currentSection][i].text + ' '
      subtitles.appendChild(element)
    }

    setInterval(() => {
      this.state.syncData[currentSection].forEach((ele, index, array) => {
        if (
          this.props.song.destination.context.currentTime - fakeTime >=
            ele.start &&
          this.props.song.destination.context.currentTime - fakeTime <= ele.end
        ) {
          subtitles.children[index].style.background = 'yellow'
          if (ele.finalWord) {
            currentSection++
            // reset to next line
            subtitles.innerText = ''
            for (
              let i = 0;
              i < this.state.syncData[currentSection].length;
              i++
            ) {
              element = document.createElement('span')
              element.innerText =
                this.state.syncData[currentSection][i].text + ' '
              subtitles.appendChild(element)
            }
          }
        }
      })
    }, 100)
  }

  pitchLogger = () => {
    if (this.state.trackingPitch === true) {
      let voice = new Wad({source: 'mic'}) // also asks for microphone permission
      let tuner = new Wad.Poly()
      let song = this.props.song

      song.play()

      let currentTime = tuner.destination.context.currentTime.toFixed(1)

      tuner.setVolume(0) // eliminate microphone feedback by muting the output from the tuner
      tuner.add(voice)

      voice.play() // you must have browser permission to access microphone before calling play()
      tuner.updatePitch() // the tuner is now calculating the pitch and note name

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
            // remove numbers and only keep letter note and if it is sharp or flat
            tuner.noteName
              ? (note = tuner.noteName.replace(/[0-9]/g, ''))
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
      this.createSubtitle()
    }
    // tuner.stopUpdatingPitch(); // Stop calculating the pitch
  }

  render() {
    return (
      <div>
        <button onClick={this.handlePitchLogger}> Start Game </button>
        <p>Current Note: {this.state.currentNote}</p>
        <p>Score: {this.state.score}</p>
        <p>Current Time: {this.state.currentTime}</p>
        <p>Target Note: {this.state.adeleNotes[this.state.currentTime]}</p>
        <div id="subtitles" />
      </div>
    )
  }
}

export default Sing
