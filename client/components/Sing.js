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
      lyricsData: [
        // [
        //   {start: '1', end: '1.5', text: '1'},
        //   {start: '1.5', end: '2', text: '1', finalWord: true}
        // ],
        // [
        //   {start: '2', end: '2.5', text: '2'},
        //   {start: '2.5', end: '3', text: '2', finalWord: true}
        // ],
        // [
        //   {start: '3', end: '3.5', text: '3'},
        //   {start: '3.5', end: '4', text: '3', finalWord: true}
        // ],
        [
          {start: '3', end: '5', text: 'I'},
          {start: '5', end: '5.5', text: 'heard'},
          {start: '6.5', end: '7', text: 'that'},
          {start: '7', end: '7.5', text: 'you'},
          {start: '8', end: '9.5', text: 'settled'},
          {start: '9.5', end: '10', text: 'down'},
          {start: '10', end: '11', text: ' ', finalWord: true}
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
        ],
        [
          {start: '20', end: '21', text: 'whoa'},
          {start: '21', end: '22', text: 'you'},
          {start: '22', end: '23', text: 'made'},
          {start: '23', end: '24', text: 'it'},
          {start: '24', end: '25', text: 'so'},
          {start: '25', end: '26', text: 'far'},
          {start: '26', end: '27', text: 'end'},
          {start: '27', end: '28', text: 'interval?', finalWord: true}
        ],
        [
          {start: '28', end: '29', text: '###'},
          {start: '21', end: '22', text: '###'},
          {start: '22', end: '23', text: 'made'},
          {start: '23', end: '24', text: 'it'},
          {start: '24', end: '25', text: 'so'},
          {start: '25', end: '26', text: 'far'},
          {start: '26', end: '27', text: 'end'},
          {start: '27', end: '28', text: 'interval?', finalWord: true}
        ]
      ]
    }
    this.pitchLogger = this.pitchLogger.bind(this)
    this.handlePitchLogger = this.handlePitchLogger.bind(this)
    this.createSubtitle = this.createSubtitle.bind(this)
  }

  componentDidMount() {
    this.props.onRef(this)
  }

  handlePitchLogger() {
    this.setState({trackingPitch: true}, function() {
      this.pitchLogger()
    })
  }

  createSubtitle = () => {
    let windowTime = this.props.song.destination.context.currentTime
    let subtitles = document.getElementById('subtitles')
    let element

    let currentSection = 0

    for (let i = 0; i < this.state.lyricsData[currentSection].length; i++) {
      element = document.createElement('span')
      element.innerText = this.state.lyricsData[currentSection][i].text + ' '
      subtitles.appendChild(element)
    }

    const updateLyricsSection = setInterval(() => {
      let stop = false
      this.state.lyricsData[currentSection].forEach((ele, index, array) => {
        if (
          this.props.song.destination.context.currentTime - windowTime >=
            ele.start &&
          this.props.song.destination.context.currentTime - windowTime <=
            ele.end
        ) {
          subtitles.children[index].style.background = 'yellow'
          if (ele.finalWord) {
            currentSection++

            // break if on last Section
            if (currentSection === this.state.lyricsData.length) {
              stop = true
              clearInterval(updateLyricsSection)
            }

            // reset to next line
            subtitles.innerText = ''

            // update subtitle div
            for (
              let i = 0;
              !stop && i < this.state.lyricsData[currentSection].length;
              i++
            ) {
              element = document.createElement('span')
              element.innerText =
                this.state.lyricsData[currentSection][i].text + ' '
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

      let windowTime = tuner.destination.context.currentTime.toFixed(1)

      tuner.setVolume(0) // eliminate microphone feedback by muting the output from the tuner
      tuner.add(voice)

      voice.play() // you must have browser permission to access microphone before calling play()
      tuner.updatePitch() // the tuner is now calculating the pitch and note name

      let results = {}

      let logPitch = () => {
        requestAnimationFrame(logPitch)

        if (
          (tuner.destination.context.currentTime.toFixed(1) - windowTime) %
            0.5 ===
            0 &&
          tuner.destination.context.currentTime.toFixed(1) - windowTime > 0
        ) {
          let time =
            tuner.destination.context.currentTime.toFixed(1) - windowTime ||
            tuner.destination.context.currentTime.toFixed(0) - windowTime
          this.setState({currentTime: time})

          let note
          if (!results[time]) {
            // include sharps: replace(/[0-9]/g, '')
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
      this.createSubtitle()
    }
    // tuner.stopUpdatingPitch(); // Stop calculating the pitch
  }

  render() {
    return (
      <div>
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
